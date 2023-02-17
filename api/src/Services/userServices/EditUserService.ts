import pool from "../../config/database";
import { IUser } from "../../Models/User";

class EditUserService {
    static async execute({ id, name, email }: Omit<IUser, 'password'>) {
        const sql = 'UPDATE public.users SET name = $1, email = $2 WHERE id = $3';
        pool.query(sql, [name, email, id]);
    }
}

export default EditUserService;