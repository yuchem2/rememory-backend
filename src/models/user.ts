import mongoose from 'mongoose'
import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { UserNotFoundException } from '@/types/errors'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public clientId: string

    @prop({ required: true })
    public nickname: string

    @prop({ required: true })
    public passwd: string

    @prop()
    public oauthProvider: string

    public static async login(this: ReturnModelType<typeof User>, oauthProvider: string, oauthId: string, passwd: string): Promise<User> {
        return this.findByFilter({ oauthProvider: oauthProvider, clientId: oauthId, passwd: passwd })
    }

    public static async checkDuplicateId(this: ReturnModelType<typeof User>, id: string): Promise<boolean> {
        const user = await this.findOne({ clientId: id })
        if (user) {
            return true
        } else {
            return false
        }
    }

    public static async checkDuplicateNickname(this: ReturnModelType<typeof User>, nickname: string): Promise<boolean> {
        const user = await this.findOne({ nickname: nickname })
        if (user) {
            return true
        } else {
            return false
        }
    }

    private static async findByFilter(this: ReturnModelType<typeof User>, filter: object): Promise<User> {
        const user = await this.findOne(filter).exec()
        if (user) {
            return user
        } else {
            throw new UserNotFoundException()
        }
    }
}

export const UserModel = getModelForClass(User)
