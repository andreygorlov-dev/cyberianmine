"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class UserRepository {
    save(user) {
        return new Promise((resolve, reject) => {
            db_1.default.query("INSERT INTO Users (login, password, referal) VALUES(?,?,?)", [user.login, user.password, user.referal], (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res.affectedRows);
                }
            });
        });
    }
}
exports.default = UserRepository;
