import {ILoginData} from "../../types/loginData";
import AuthService from "../../service/AuthService";
import {makeAutoObservable} from "mobx";
import api from "../../http";
import jwtDecode from "jwt-decode";
import {IJwtClaims} from "../../types/jwtClaims";
import {UserRole} from "../../types/enums/userRole";

export default class AuthStore {
    userId: number | null = null;
    userRole: string | null = null;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    private setFieldsFromToken(token: string) {
        const jwtClaims = jwtDecode<IJwtClaims>(token);
        this.userId = jwtClaims.userId;
        this.userRole = jwtClaims.userRole;
    }

    login(loginData: ILoginData): Promise<any> {
        return AuthService.login(loginData).then(res => {
            localStorage.setItem("auth-token", res.data.token);
            this.isAuth = true;
            this.setFieldsFromToken(res.data.token);
        })
    }

    logout(): void {
        localStorage.removeItem("auth-token");
        this.isAuth = false;
        this.userId = null;
        this.userRole = null;
    }

    checkAuth(): void {
        api.get("auth/check-auth")
            .then(() => {
                this.isAuth = true;
                const token = localStorage.getItem("auth-token");
                if (token) {
                    this.setFieldsFromToken(token);
                }
            })
            .catch(reason => {
                console.log(reason);
            });
    }

    isCustomer(): boolean {
        return this.userRole === UserRole.CUSTOMER;
    }

    isAdmin(): boolean {
        return this.userRole === UserRole.ADMIN;
    }
}