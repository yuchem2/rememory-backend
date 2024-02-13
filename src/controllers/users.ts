import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'
import { UserModel } from '@/models/user'
import { signIn } from '@/services/user'

const router = asyncify(express.Router())

router.post('/login', async (req: Request, res: Response) => {
    // TODO: passwd decryption & encryption
    const loginInfo = {
        provider: req.body.provider,
        clientId: req.body.clientId,
        passwd: req.body.passwd,
    }

    const user = await UserModel.login(loginInfo.provider, loginInfo.clientId, loginInfo.passwd)
    const token = await signIn(loginInfo.provider, user)
    res.status(200).json({ jwt: token, nickname: user.nickname })
})

export default router
