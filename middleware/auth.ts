import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const config: string = process.env.ACCESS_TOKEN_KEY !== undefined
    ?  process.env.ACCESS_TOKEN_KEY
    : "";

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
