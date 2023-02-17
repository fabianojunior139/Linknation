import ListLinksService from "../Services/linkServices/ListLinksService";
import FindLinkByIdService from "../Services/linkServices/FindLinkByIdService";
import CreateNewLinkService from "../Services/linkServices/CreateNewLinkService";
import EditLinkService from "../Services/linkServices/EditLinkService";
import DeleteLinkService from "../Services/linkServices/DeleteLinkService";
import ListLinksFilteredService from "../Services/linkServices/ListLinksFilteredService";

export interface ILink {
    id: number,
    link_title: string,
    link: string,
    id_user: number
}

class Link {
    static async list(id_user: number) {
        return await ListLinksService.execute(id_user);
    }

    static async FindById(id: number) {
        return await FindLinkByIdService.execute(id);
    }

    static async ListLinksFiltered(link_title: string, id_user: number) {
        return await ListLinksFilteredService.execute(link_title, id_user);
    }

    static async CreateNewLink({ link_title, link, id_user }: Omit<ILink, 'id'>) {
        return await CreateNewLinkService.execute({ link_title, link, id_user });
    }

    static async EditLink({ id, link_title, link }: Omit<ILink, 'id_user'>) {
        return await EditLinkService.execute({ id, link_title, link });
    }

    static async Delete(id: number) {
        return await DeleteLinkService.execute(id);
    }
}

export default Link;