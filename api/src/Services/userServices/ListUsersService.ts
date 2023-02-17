import pool from "../../config/database";

class ListUsersService {
    static async execute() {
        const sql = 'SELECT id, name, email FROM users ORDER BY id';
        const users = await pool.query(sql);        
        return users.rows;
    }
}

export default ListUsersService;