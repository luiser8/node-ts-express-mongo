import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const accesstoken: string = process.env.ACCESS_TOKEN_KEY !== undefined
    ? process.env.ACCESS_TOKEN_KEY
    : "";

const refreshtoken: string = process.env.REFRESH_TOKEN_KEY !== undefined
    ? process.env.REFRESH_TOKEN_KEY
    : "";

export const sign = async (id: string, username: string) => {
    return jwt.sign(
        { id, username },
        accesstoken, { expiresIn: "7d"}
    );
}
export const signrefresh = async (id: string, username: string) => {
    return jwt.sign(
        { id, username },
        refreshtoken, { expiresIn: "7d"}
    );
}
