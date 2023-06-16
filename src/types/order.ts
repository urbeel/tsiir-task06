import {IItem} from "./item";
import {IUser} from "./user";
import {OrderStatus} from "./enums/orderStatus";

export interface IOrder {
    id: number,
    items: IItem[],
    user: IUser,
    status: OrderStatus,
    orderTime: Date,
    totalPrice: number
}
