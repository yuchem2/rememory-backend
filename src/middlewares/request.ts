import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

export function requestId(req: Request, res: Response, next: NextFunction) {
    res.meta = {
        requestId: uuidv4(),
    }
    next()
}
