import pool from "../../config/database";
import { ILink } from "../../Models/Link";

class EditLinkService {
    static async execute({ id, link_title, link }: Omit<ILink, 'id_user'>) {
        const sql = 'UPDATE public.links SET link_title = $1, link = $2 WHERE id = $3';
        await pool.query(sql, [link_title, link, id]);
    }
}

export default EditLinkService;