export interface IUser {
    id: number,
    email: string,
    password: string,
    confirmPassword?: string,
    firstname: string,
    lastname: string,
    phone: string,
    address: string,
    role: string
}
