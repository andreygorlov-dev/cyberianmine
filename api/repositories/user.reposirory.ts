import { ResultSetHeader } from "mysql2";
import connection from "../db";
import User from "../models/user.model";

interface IUserRepository {

    save(user: User): Promise<number>;
    login(email: string): Promise<User>;
    updatePassword(id: number, passwordNew: string): Promise<number>;
    isEmailExist(email: string): Promise<boolean>;
   
}

class UserRepository implements IUserRepository {

    save(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
                "INSERT INTO USERS (EMAIL, PASSWORD, REFERAL) VALUES(?,?,?)",
                [user.email, user.password, user.referal],
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

    login(email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM USERS WHERE EMAIL = ?",
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
                "UPDATE USERS SET PASSWORD = ? WHERE ID = ?",
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
                "SELECT * FROM USERS WHERE EMAIL = ?",
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