import { APIError } from '@/types/errors/error'

export class InternalServerError extends APIError {
    constructor(cause: Error | string = null) {
        super(500, 500, 'internal server error', cause)
        Error.captureStackTrace(this, InternalServerError)
    }
}
