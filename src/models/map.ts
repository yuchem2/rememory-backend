import mongoose from 'mongoose'
import { getModelForClass, prop } from '@typegoose/typegoose'

export class Map {
    public _id: mongoose.Types.ObjectId

    @prop({ required: true })
    public name: string

    @prop({ required: true })
    public category: string

    @prop({ ref: Map })
    public parentMapId: mongoose.Types.ObjectId

    @prop({ ref: Map })
    public maps: mongoose.Types.ObjectId[]
}

export const MapModel = getModelForClass(Map)
