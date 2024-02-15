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

router.get('/check-id', async (req: Request, res: Response) => {
    const success = await UserModel.checkDuplicateId(req.body.id)
    res.status(200).json({
        success: success,
        message: !success ? '중복된 아이디 입니다. 다른 아이디를 입력해 주세요.' : undefined,
    })
})

router.get('/check-nickname', async (req: Request, res: Response) => {
    const success = await UserModel.checkDuplicateNickname(req.body.nickname)
    res.status(200).json({
        success: success,
        message: !success ? '중복된 닉네임입니  c다. 다른 닉네임을 입력해 주세요.' : undefined,
    })
})

export default router
