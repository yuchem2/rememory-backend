import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'
import { UserModel } from '@/models/user'
import { signIn } from '@/services/user'
import { LoginFailedError } from '@/types/errors'

const router = asyncify(express.Router())

router.post('/signup', async (req: Request, res: Response) => {
    // TODO: add Oauth 2.0 signup
    // TODO: passwd decryption & encryption
    await UserModel.create({
        oauthProvider: req.body.provider,
        clientId: req.body.id,
        passwd: req.body.passwd,
        nickname: req.body.nickname,
    })
    res.sendStatus(204)
})

router.post('/login', async (req: Request, res: Response) => {
    // TODO: passwd decryption & encryption
    const user = await UserModel.findByOauth(req.body.provider, req.body.id)
    if (user.passwd !== req.body.passwd) {
        throw new LoginFailedError()
    } else {
        const token = await signIn(user.oauthProvider, user)
        res.cookie('jwt', token, {
            httpOnly: true,
            domain: '127.0.0.1',
            path: '/',
            expires: new Date(Date.now() + 3600000),
            sameSite: 'lax',
        })
        res.status(200).json({ nickname: user.nickname })
    }
})

router.get('/check-id/:id', async (req: Request, res: Response) => {
    const success = await UserModel.checkDuplicateId(req.params.id)
    res.status(200).json({
        success: success,
        message: !success ? '중복된 아이디 입니다. 다른 아이디를 입력해 주세요.' : undefined,
    })
})

router.get('/check-nickname/:nickname', async (req: Request, res: Response) => {
    const success = await UserModel.checkDuplicateNickname(req.params.nickname)
    res.status(200).json({
        success: success,
        message: !success ? '중복된 닉네임입니다. 다른 닉네임을 입력해 주세요.' : undefined,
    })
})

export default router
