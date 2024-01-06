import { Request, Response } from "express";
import userRepository from "../repositories/user.reposirory";
import User from "../models/user.model";
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { secret } from "../auth.config";

export default class UserController {
    
    /**
    {
        "email": "email",
        "password": "password",
        "referal": "referal"
    }
     */
    async save(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        
        if (await userRepository.isEmailExist(req.body.email)) {
            res.status(400).send({
                message: "This email is registered!"
            });
            return;
        }

        try {
            const user:User = req.body;
            user.password = await argon2.hash(user.password);
            await userRepository.save(user);
            res.status(201).send();
        } catch (err) {
            res.status(500).send({
                 message: "Some error occurred while retrieving user.",
                 error: err
            });
        }
    }

    async login(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const user = await userRepository.login(req.body.email);
            const correctPassword = await argon2.verify(user.PASSWORD, req.body.password);
            if (!correctPassword) {
                res.status(401).send('Incorrect password');
                return;
            }
            const expiration = '30m';
    
            const data = {
                id: user.ID,
                email: user.EMAIL
            };
             
            res.status(200).send({token : jwt.sign({ data }, secret, { expiresIn: expiration })});
        } catch (err) {
            res.status(401).send({
                 message: 'Error login.',
                 error: err
            });
        }
    }

}