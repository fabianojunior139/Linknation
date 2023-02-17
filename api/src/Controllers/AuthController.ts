import User from '../Models/User';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export interface Ilogin {
    email: string,
    password: string
}

export interface IPassword {
    id: number,
    old_password: string,
    new_password: string,
}

const SECRET = 'jwtToken';

class AuthController {
    static async login({ email, password }: Ilogin) {

        const user = await User.FindByEmail(email);

        if (user) {
            const userPass = user.password;
            const userId = user.id;

            const verifyPass = await bcrypt.compare(password, userPass);

            if (verifyPass === true) {
                const token = jwt.sign({ userId }, SECRET, { expiresIn: '12h' });

                delete user.senha;

                user.token = token;
                user.auth = true;

                return user;
            } else {
                return false;
            }

        }
    }

    static verifyJWT(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        if (!authorization) return res.status(401).json({ auth: false, message: 'No token provide' });
        const token = authorization.replace('Bearer', '').trim();

        try {
            jwt.verify(token, SECRET);
            next();
        } catch {
            return res.status(401).json({ auth: false, mesage: 'Failed to authenticate token' });
        }
    }

    static async EditPassword({ id, old_password, new_password }: IPassword) {
        const user = await User.FindById(id);

        if (user) {
            const current_password = user.password;
            const verify_password = await bcrypt.compare(old_password, current_password);         

            if (verify_password === true) {
                if (new_password != old_password) {                    
                    const hashSenha = await bcrypt.hash(new_password, 10);                    
                    await User.UpdatePass(id, hashSenha);
                    return true;

                } else {                    
                    return false;
                }
            } else {
                return false;
            }

        } else {
            return false;
        }

    }
}

export default AuthController;