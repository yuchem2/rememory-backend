import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { User } from '@/models/user'

export async function signIn(provider: string, user: User): Promise<string> {
    // TODO: change secret code
    return jwt.sign({ id: user.clientId, provider: provider }, 'secret-re:memory', {
        expiresIn: '1h',
        jwtid: v4(),
    })
}
