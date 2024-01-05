import IUserRepository from "./IUserRepository";
import { ResultSetHeader } from "mysql2";
import connection from "../db";
import User from "../models/User.model";

export default class UserRepository implements IUserRepository {
    save(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
                "INSERT INTO Users (login, password, referal) VALUES(?,?,?)",
                [user.login, user.password, user.referal],
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.affectedRows)
                    }
                }
            );
        });
    }

    // update(user: User): Promise<number> {

    // }

    // delete(user: User): Promise<number> {

    // }
    // 
    // login(user: User): Promise<User | undefined> {

    // }
}