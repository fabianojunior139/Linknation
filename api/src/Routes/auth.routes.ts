import { Router } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await AuthController.login({ email, password });

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(404).json({ message: 'Usuário ou senha incorretos.' });
    }
});

authRouter.put('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const { old_password, new_password } = req.body;

    const user = await AuthController.EditPassword({ id, old_password, new_password });

    if (user) {
        return res.status(200).json({ message: 'Senha de usuário alterada com sucesso' });
    } else {
        return res.status(401).json({ message: 'Senha antiga não está correta' });
    }
})

export default authRouter;