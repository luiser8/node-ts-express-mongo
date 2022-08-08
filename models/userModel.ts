import { Schema, model, Document } from 'mongoose';
import IUser from '../interfaces/IUser';


const userSchema = new Schema<IUser>({
    firstname: {type: String, required: true, max: 155},
    lastname: {type: String, required: true, max: 155},
    email: {type: String, unique: true, required: true, max: 155},
    username: {type: String, unique: true, required: true, max: 155},
    password: {type: String, required: true, max: 155},
    accesstoken: {type: String, required: false},
    refreshtoken: {type: String, required: false},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const User = model<IUser>('User', userSchema);

export default User;
