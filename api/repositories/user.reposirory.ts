import { ResultSetHeader } from "mysql2";
import connection from "../db";
import User from "../models/user.model";

interface IUserRepository {

    save(user: User): Promise<number>;
    //update(user: User): Promise<number>;
    //delete(user: User): Promise<number>;
    //login(user: User): Promise<User | undefined>;
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

    //update(user: User): Promise<number> {

    //}

    // delete(user: User): Promise<number> {

    // }
    // 
    // login(user: User): Promise<User | undefined> {

    // }

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