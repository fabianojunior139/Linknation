import { Router } from "express";
import UserController from "../Controllers/userController";
import AuthController from "../controllers/AuthController";
import bcrypt from 'bcrypt';

const userRouter = Router();

userRouter.get('/', AuthController.verifyJWT, async (req, res) => {
    const users = await UserController.ListUsers();
    return res.status(200).json(users)
})

userRouter.get('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const users = await UserController.FindUserById(id);
    return res.status(200).json(users);
})

userRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const hashSenha = await bcrypt.hash(password, 10);
    const user = await UserController.CreateNewUser({ name, email, password: hashSenha });

    if (user) {
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } else {
        return res.status(401).json({ message: 'E-mail já cadastrado no sistema!' });
    }
});

userRouter.put('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = await UserController.EditUser({ id, name, email });

    if (user) {
        return res.status(200).json({ message: 'Usuário alterado com sucesso!' })
    } else {
        return res.status(200).json({ message: 'E-mail já cadastrado! Tente novamente' })
    }
})

userRouter.delete('/:id', AuthController.verifyJWT, async (req, res) => {
    const id = parseInt(req.params.id);
    await UserController.DeleteUser(id);

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
});

export default userRouter;