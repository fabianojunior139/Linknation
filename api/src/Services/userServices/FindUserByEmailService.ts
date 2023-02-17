import pool from "../../config/database"

class FindUserByEmailService {
    static async execute(email: string) {
        const sql = 'SELECT * FROM users WHERE users.email = $1';
        const user = await pool.query(sql, [email]);
        return user.rows[0];
    }
}

export default FindUserByEmailService