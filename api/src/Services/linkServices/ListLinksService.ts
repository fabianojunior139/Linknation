import pool from "../../config/database";

class ListLinksService {
    static async execute(id_user: number) {
        const sql = 'SELECT id, link_title, link FROM links WHERE id_user = $1 ORDER BY id DESC';
        const links = await pool.query(sql, [id_user]);
        return links.rows;
    }
}

export default ListLinksService;