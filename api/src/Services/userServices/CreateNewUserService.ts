import pool from "../../config/database";
import { IUser } from "../../Models/User";

class CreateNewUserService {
    static async execute({ name, email, password }: Omit<IUser, 'id'>) {
        const sql = 'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3);';
        pool.query(sql, [name, email, password]);
    }
}

export default CreateNewUserService;