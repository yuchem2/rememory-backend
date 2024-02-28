import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { userJWTPayload, errors } from '@/types'
import { UserModel } from '@/models/user'
import cookieParser from 'cookie-parser'

async function verifySecret(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.Authorization
    if (!token.startsWith('Bearer ')) {
        throw new Error('not bearer token')
    }

    try {
        const jsonwebtoken = token.split(' ')[1]
        // TODO: change secret code
        const payload = verify(jsonwebtoken, 'secret-re:memory') as userJWTPayload
        req.user = await UserModel.findByOauth(payload.provider, payload.id)
        next()
    } catch (e) {
        throw new errors.Unauthorized(e)
    }
}

export const verifyUser = [cookieParser(), verifySecret]
