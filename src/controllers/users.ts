import express, { Request, Response } from 'express'
import asyncify from 'express-asyncify'
import bcrypt from 'bcrypt'
import { UserModel } from '@/models/user'
import { signIn } from '@/services/user'
import { LoginFailedError } from '@/types/errors'
import { decodePasswd } from '@/services/keyManager'

const router = asyncify(express.Router())

router.post('/signup', async (req: Request, res: Response) => {
    // TODO: add Oauth 2.0 signup
    const passwd = decodePasswd(req.body.iv, req.body.tag, req.body.passwd)
    const hashPasswd = await bcrypt.hash(passwd, 10)

    await UserModel.create({
        oauthProvider: req.body.provider,
        oauthId: req.body.id,
        passwd: hashPasswd,
        nickname: req.body.nickname,
    })
    res.sendStatus(204)
})

router.post('/login', async (req: Request, res: Response) => {
    const user = await UserModel.findByOauth(req.body.provider, req.body.id)
    const passwd = decodePasswd(req.body.iv, req.body.tag, req.body.passwd)
    const match = await bcrypt.compare(passwd, user.passwd)
    if (!match) {
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
