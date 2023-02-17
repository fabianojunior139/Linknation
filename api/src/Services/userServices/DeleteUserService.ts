import pool from "../../config/database";

class DeleteUserService {
    static async execute(id: number) {
        const sql = 'DELETE from users WHERE id = $1';
        pool.query(sql, [id]);
    }
}

export default DeleteUserService;