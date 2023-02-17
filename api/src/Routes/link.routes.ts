import { Router } from "express";
import LinkController from "../Controllers/LinkController";
import AuthController from "../controllers/AuthController";

const linkRouter = Router();

linkRouter.get('/:id_user', AuthController.verifyJWT, async (req, res) => {
    const id_user = parseInt(req.params.id_user);
    const users = await LinkController.ListLinks(id_user);
    return res.status(200).json(users)
})

linkRouter.get('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const users = await LinkController.FindLinkById(id);
    return res.status(200).json(users);
})

linkRouter.post('/', AuthController.verifyJWT, async (req, res) => {
    const { link_title, link, id_user } = req.body;
    await LinkController.CreateNewLink({ link_title, link, id_user });
    return res.status(201).json({ message: 'Link criado com sucesso!' });
});

linkRouter.post('/filters/:id_user', AuthController.verifyJWT, async (req, res) => {
    const { link_title } = req.body
    const id_user = parseInt(req.params.id_user);
    const link_filtered = await LinkController.ListLinksFiltered(link_title, id_user);
    return res.status(200).json(link_filtered);
});

linkRouter.put('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const { link_title, link } = req.body;
    await LinkController.EditLink({ id, link_title, link });
    return res.status(200).json({ message: 'Link alterado com sucesso!' });
});

linkRouter.delete('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    await LinkController.DeleteLink(id);
    return res.status(200).json({ message: 'Link excluído com sucesso!' });
});


export default linkRouter;