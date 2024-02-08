import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export class User extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public clientId: string

    @prop({ required: true })
    public passwd: string

    @prop()
    public oauthProvider: string
}

export const UserModel = getModelForClass(User)
