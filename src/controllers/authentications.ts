import asyncify from 'express-asyncify'
import express, { Request, Response } from 'express'
import { publicKey } from '@/services/rsa'

const router = asyncify(express.Router())

router.get('/rsa', async (req: Request, res: Response) => {
    // TODO: add middleware to validate request authorization
    res.status(200).json({ key: publicKey.toString() })
})

export default router
