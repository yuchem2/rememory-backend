import { APIError } from '@/types/errors/error'

export class Unauthorized extends APIError {
    constructor(cause: Error | string = null) {
        super(401, 401, 'unauthorized', cause)
        Object.setPrototypeOf(this, Unauthorized.prototype)
        Error.captureStackTrace(this, Unauthorized)
    }
}
