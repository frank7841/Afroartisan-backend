import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;
@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    name:string;
    @Prop({required:true, unique:true})
    email:string;
    @Prop()
    avatar?:string;
    @Prop({required:true})
    provider:string;
    @Prop({required:true})
    providerId:string;
    @Prop({default:'user'})
    role:string;
    @Prop({default:true})
    isActive:boolean;
}
export const UserSchema = SchemaFactory.createForClass(User)