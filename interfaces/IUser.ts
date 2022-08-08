import { Document } from "mongoose";

export default interface IUser extends Document{
    _id?: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    accesstoken?: string,
    refreshtoken?: string,
    status?: boolean
}