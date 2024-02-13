import { APIError } from '@/types/errors/error'

export class UserNotFoundException extends APIError {
    constructor() {
        super(401, 600, 'user not found')
        Object.setPrototypeOf(this, UserNotFoundException)
        Error.captureStackTrace(this, UserNotFoundException)
    }
}
