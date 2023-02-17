import pool from "../../config/database";

class UpdateUserPassService {
    static async execute(id: number, new_password: string) {
        const sql = 'UPDATE public.users SET password = $1 WHERE id = $2';
        await pool.query(sql, [new_password, id]);
    }
}

export default UpdateUserPassService;