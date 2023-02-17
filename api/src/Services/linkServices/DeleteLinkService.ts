import pool from "../../config/database";

class DeleteLinkService {
    static async execute(id: number) {
        const sql = 'DELETE FROM public.links WHERE id = $1';
        await pool.query(sql, [id]);
    }
}

export default DeleteLinkService;