import { ResultSetHeader } from "mysql2";
import connection from "../db";
import User from "../models/user.model";

interface IUserRepository {

    save(user: User): Promise<number>;
    login(email: string): Promise<User>;
    updatePassword(id: number, passwordNew: string): Promise<number>;
    isEmailExist(email: string): Promise<boolean>;
    getData(id: number): Promise<User>;
}

class UserRepository implements IUserRepository {

    save(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
                "insert into users (email, password, fullname, numberphone) values(?, ?, ?, ?)",
                [user.email, user.password, user.fullname, user.numberphone],
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

    getData(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "select * from users where id = ?",
                    [id],
                    (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (res?.length > 0) {
                                resolve(res?.[0]);
                            } else { 
                                reject("User not found");
                            }
                        }
                    }
            );
        });
    }

    login(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "select * from users where email = ?",
                    [email],
                    (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (res?.length > 0) {
                                resolve(res?.[0]);
                            } else { 
                                reject("User not found");
                            }
                        }
                    }
            );
        });
    }

    updatePassword(id: number, passwordNew: string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
                "update users set password = ? where id = ?",
                [passwordNew, id],
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

    isEmailExist(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "select * from users where email = ?",
                [email],
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res?.length > 0);
                    }
                }
            );
        });
    }
}

export default new UserRepository();