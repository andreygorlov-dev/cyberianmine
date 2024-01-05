import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
    id?: number;
    login?: string;
    password?: string;
    referal?: string;
}