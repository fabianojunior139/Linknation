import pool from "../../config/database";
import { ILink } from "../../Models/Link";

class CreateNewLinkService {
    static async execute({ link_title, link, id_user }: Omit<ILink, 'id'>) {
        const sql = 'INSERT INTO public.links(link_title, link, id_user) VALUES ($1, $2, $3)';
        await pool.query(sql, [link_title, link, id_user]);
    }
}

export default CreateNewLinkService;