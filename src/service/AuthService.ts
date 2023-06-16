import {ILoginData} from "../types/loginData";
import axios, {AxiosResponse} from "axios";
import api, {API_URL} from "../http";
import {IUser} from "../types/user";

class AuthService {
    private static axios = axios.create({baseURL: API_URL});

    static login(loginData: ILoginData): Promise<AxiosResponse<{ token: string }>> {
        return this.axios.post<{ token: string }>("/auth/login", loginData);
    }

    static register(user: IUser): Promise<AxiosResponse> {
        return this.axios.post("/auth/registration", user);
    }

    static createAdmin(user: IUser): Promise<AxiosResponse> {
        return api.post<IUser>("/auth/create-admin", user);
    }

}

export default AuthService;
