import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import IUser from '../interfaces/IUser';
dotenv.config();

const accesstoken: string = process.env.ACCESS_TOKEN_KEY !== undefined
    ? process.env.ACCESS_TOKEN_KEY
    : "";

const refreshtoken: string = process.env.REFRESH_TOKEN_KEY !== undefined
    ? process.env.REFRESH_TOKEN_KEY
    : "";

export const sign = async (user: IUser) => {
    return jwt.sign({'_id': user._id, 'username': user.username}, accesstoken, { expiresIn: "7d"} );
}
export const signrefresh = async (user: IUser) => {
    return jwt.sign({'_id': user._id, 'username': user.username}, refreshtoken, { expiresIn: "14d"} );
}
