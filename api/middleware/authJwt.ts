import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../auth.config";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if (!req.headers.authorization) {
        return res.status(401).send("No token!");
    }

    const token: string = req.headers.authorization.split(" ")[1];

    try {
        const credential: string | object = jwt.verify(token, secret);
        if (credential) {
            req.app.locals.credential = credential;
            return next();
        }
        return res.send("token invalid");
    } catch (err) {
        return res.send(err);
    }
};