import pool from "../../config/database";

class ListLinksFilteredService {
    static async execute(link_title: string, id_user: number) {
        const sql = `SELECT * FROM links WHERE link_title ILIKE '%${link_title}%' AND id_user = $1 ORDER BY id DESC`;        
        const links = await pool.query(sql, [id_user]);
        return links.rows;
    }
}

export default ListLinksFilteredService;