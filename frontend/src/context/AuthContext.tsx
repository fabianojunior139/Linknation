import { createContext, useState } from "react";
import { authApi } from "../database/api";

export interface IUser {
    id: number,
    name: string,
    email: string,
    token: string,
    auth: boolean
}

export interface IUserLogin {
    email: string,
    password: string
}

interface IAuthContext {
    user: IUser;
    login(user: IUserLogin): boolean;
    logout(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: any) => {

    const [userData, setUserData] = useState<IUser>(() => {
        const user = localStorage.getItem('user');

        if (user) {
            return JSON.parse(user);
        }

        return {} as IUser
    });

    const login = (user: IUserLogin) => {

        try {
            authApi("").post('/auth', user)
                .then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setUserData(response.data);
                    
                }).catch(() => {
                    alert("Usuário ou senha incorretos!");
                })

        } catch (error) {
            console.log(error);
        }

        return true
    }

    const logout = () => {
        localStorage.clear();
        setUserData({} as IUser);
        alert('usuário deslogado com sucesso!');
    }

    return (
        <AuthContext.Provider value={{ user: userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider };

export default AuthContext;