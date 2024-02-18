import { APIError } from '@/types/errors/error'

export class UserNotFoundException extends APIError {
    constructor() {
        super(404, 600, 'user not found')
        Object.setPrototypeOf(this, UserNotFoundException.prototype)
        Error.captureStackTrace(this, UserNotFoundException)
    }
}
