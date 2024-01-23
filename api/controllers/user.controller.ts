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
        "fullname": "fullname",
        "numberphone": "+79999999999"
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
            const correctPassword = await argon2.verify(user.password, req.body.password);
            if (!correctPassword) {
                res.status(401).send('Incorrect password');
                return;
            }
            const expiration = '30m';
    
            const data = {
                id: user.id,
                email: user.email
            };
             
            res.status(200).send({token : jwt.sign({ data }, secret, { expiresIn: expiration })});
        } catch (err) {
            res.status(401).send({
                 message: 'Error login.',
                 error: err
            });
        }
    }

    /**
     {
        "email": "email",
        "password_old": "password",
        "password_new": "password2",
    } 
     */
    async updatePassword(req: Request, res: Response) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        
        if (req.body.password_old === req.body.password_new) {
            res.status(500).send('The new password cannot be similar to the old one');
            return;
        }

        const user = await userRepository.login(req.body.email);
        const correctPassword = await argon2.verify(user.password, req.body.password_old);
        if (!correctPassword) {
            res.status(401).send('Incorrect password');
            return;
        }
        try {
            
            await userRepository.updatePassword(user.ID, await argon2.hash(req.body.password_new));
            res.status(200).send();
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving user.",
                error: err
            });
        }

    }

    async getData(req: Request, res: Response) {
        try {
            const id: number = req.app.locals.credential.data.id;
            const user = await userRepository.getData(id);
            user.password = "";
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send();
        }
    }

}