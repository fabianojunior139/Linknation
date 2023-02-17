import pool from "../../config/database";

class FindUserByIdService {
    static async execute(id: number) {
        const sql = 'SELECT id, name, email FROM users WHERE id = $1';
        const user = await pool.query(sql, [id]);
        return user.rows[0];
    }
}

export default FindUserByIdService;