import {AxiosResponse} from "axios";
import {IUser} from "../types/user";
import api from "../http";

class UserService {
    static readAll(): Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>('/users');
    }
}

export default UserService;
