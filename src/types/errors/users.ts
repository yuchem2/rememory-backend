import { APIError } from '@/types/errors/error'

export class LoginFailedError extends APIError {
    constructor() {
        super(401, 601, 'login failed')
        Object.setPrototypeOf(this, LoginFailedError.prototype)
        Error.captureStackTrace(this, LoginFailedError)
    }
}

export class SignupFailError extends APIError {
    constructor() {
        super(400, 602, 'Signup failed')
        Object.setPrototypeOf(this, SignupFailError)
        Error.captureStackTrace(this, SignupFailError)
    }
}
