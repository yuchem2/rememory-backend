import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { User } from '@/models/user'
import { Map } from '@/models/map'

export class Memory extends TimeStamps {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true, ref: User })
    public owner: mongoose.Types.ObjectId

    @prop({ required: true, ref: Map })
    public mapId: mongoose.Types.ObjectId

    @prop({ required: true })
    public title: string

    @prop({ required: true })
    public content: string

    @prop({ required: true })
    public startDate: Date

    @prop({ required: true })
    public endDate: Date
}

export const MemoryModel = getModelForClass(Memory)
