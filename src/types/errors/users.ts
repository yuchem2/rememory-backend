import { APIError } from '@/types/errors/error'

export class LoginFailedError extends APIError {
    constructor() {
        super(404, 601, 'login failed')
        Object.setPrototypeOf(this, LoginFailedError.prototype)
        Error.captureStackTrace(this, LoginFailedError)
    }
}
