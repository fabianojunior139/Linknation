import ListUsersService from "../Services/userServices/ListUsersService";
import FindUserByIdService from "../Services/userServices/FindUserByIdService";
import FindUserByEmailService from "../Services/userServices/FindUserByEmailService";
import CreateNewUserService from "../Services/userServices/CreateNewUserService";
import EditUserService from "../Services/userServices/EditUserService";
import UpdateUserPassService from "../Services/userServices/UpdateUserPassService";
import DeleteUserService from "../Services/userServices/DeleteUserService";

export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string
}

class User {
    static async list() {
        return await ListUsersService.execute();
    }

    static async FindById(id: number) {
        return await FindUserByIdService.execute(id);
    }

    static async FindByEmail(email: string) {
        return await FindUserByEmailService.execute(email);
    }

    static async CreateUser({ name, email, password }: Omit<IUser, 'id'>) {
        return await CreateNewUserService.execute({ name, email, password });
    }

    static async EditUser({ id, name, email }: Omit<IUser, 'password'>) {
        return await EditUserService.execute({ id, name, email });
    }

    static async UpdatePass(id: number, new_password: string) {        
        return await UpdateUserPassService.execute(id, new_password);
    }

    static async Delete(id: number) {
        return await DeleteUserService.execute(id);
    }
}

export default User