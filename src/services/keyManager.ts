import fs from 'fs'
import crypto from 'crypto'
import { RSA_PUBLIC_KEY_PATH, RSA_PRIVATE_KEY_PATH } from '@/config'
import { logger } from '@/utils/logger'

let symmetricKey: Buffer
export const publicKey = fs.readFileSync(RSA_PUBLIC_KEY_PATH)
export const privateKey = fs.readFileSync(RSA_PRIVATE_KEY_PATH)

// TODO: Implement logic to handle cases where the key has been regenerated on the server after it has been sent
function rotateKey() {
    symmetricKey = crypto.randomBytes(32)
    logger.info(`successfully create new symmetric key!`)
}

rotateKey()
setInterval(rotateKey, 1000 * 60 * 60)

export function getSymmetricKey(): Buffer {
    return symmetricKey
}

export function encodeRSA(text: string): string {
    const buffer = Buffer.from(text, 'hex')
    const encrypt = crypto.privateEncrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        buffer,
    )
    return encrypt.toString('hex')
}

export function decodeRSA(text: string, encode: BufferEncoding = 'utf8'): string {
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(text, 'hex'),
    )
    return decrypted.toString(encode)
}

export function decodePasswd(iv: string, tag: string, target: string): string {
    const passwd = decodeRSA(target, 'hex')
    const decipher = crypto.createDecipheriv('aes-256-gcm', symmetricKey, Buffer.from(iv, 'base64'))
    decipher.setAuthTag(Buffer.from(tag, 'hex'))
    const decrypted = decipher.update(passwd, 'hex', 'utf-8')
    return decrypted + decipher.final('utf-8')
}
