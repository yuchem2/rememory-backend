import fs from 'fs'
import crypto from 'crypto'
import { RSA_PUBLIC_KEY_PATH, RSA_PRIVATE_KEY_PATH } from '@/config'

export const publicKey = fs.readFileSync(RSA_PUBLIC_KEY_PATH)
export const privateKey = fs.readFileSync(RSA_PRIVATE_KEY_PATH)
export function encodeRSA(text: string): string {
    const buffer = Buffer.from(text)
    const encrypt = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        buffer,
    )
    return encrypt.toString('hex')
}

export function decodeRSA(text: string): string {
    console.log(text)

    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(text),
    )
    return decrypted.toString('utf8')
}
