import pool from "../../config/database";

class FindLinkByIdService {
    static async execute(id: number) {
        const sql = 'SELECT * FROM links WHERE id = $1';
        const link = await pool.query(sql, [id]);
        return link.rows[0];
    }
}

export default FindLinkByIdService;