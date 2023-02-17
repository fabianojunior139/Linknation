import User from "../Models/User";
import { IUser } from "../Models/User";

class UserController {
    static ListUsers() {
        return User.list();
    }

    static async FindUserById(id: number) {
        return User.FindById(id);
    }

    static async FindUserByEmail(email: string) {
        return User.FindByEmail(email);
    }

    static async CreateNewUser({ name, email, password }: Omit<IUser, 'id'>) {
        const userExists = await User.FindByEmail(email);

        if (!userExists) {
            User.CreateUser({ name, email, password });
            return true
        } else {
            return false
        }

    }

    static async EditUser({ id, name, email }: Omit<IUser, 'password'>) {
        const userExists = await User.FindById(id);

        if (!userExists) {
            User.EditUser({ id, name, email });
            return true 
        } else {
            return false
        }
    }

    static async DeleteUser(id: number) {
        return User.Delete(id);
    }
}

export default UserController;