import Link from "../Models/Link";
import { ILink } from "../Models/Link";

class LinkController {
    static ListLinks(id_user: number) {
        return Link.list(id_user);
    }

    static async FindLinkById(id: number) {
        return Link.FindById(id);
    }

    static ListLinksFiltered(link_title: string, id_user: number) {
        return Link.ListLinksFiltered(link_title, id_user);
    }

    static async CreateNewLink({ link_title, link, id_user }: Omit<ILink, 'id'>) {
        return Link.CreateNewLink({ link_title, link, id_user });
    }

    static async EditLink({ id, link_title, link }: Omit<ILink, 'id_user'>) {
        return await Link.EditLink({ id, link_title, link });
    }

    static async DeleteLink(id: number) {
        return Link.Delete(id);
    }
}

export default LinkController;