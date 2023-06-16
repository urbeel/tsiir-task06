import {AxiosResponse} from "axios";
import api from "../http";
import {IOrder} from "../types/order";
import {OrderStatus} from "../types/enums/orderStatus";

class OrderService {
    static createOrder(order: IOrder): Promise<AxiosResponse> {
        return api.post("/orders", order);
    }

    static readAllByStatus(status: OrderStatus): Promise<AxiosResponse<IOrder[]>> {
        return api.get<IOrder[]>(`/orders/${status}`);
    }

    static readAllByUserId(userId: number): Promise<AxiosResponse<IOrder[]>> {
        return api.get<IOrder[]>(`/orders/user/${userId}`);
    }

    static changeOrderStatus(orderId: number, status: OrderStatus): Promise<AxiosResponse> {
        return api.patch(`/orders/${orderId}/change-status`, null, {
            params: {
                newStatus: status
            }
        });
    }
}

export default OrderService;