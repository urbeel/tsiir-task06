import {AxiosResponse} from "axios";
import {ICart} from "../types/cart";
import api from "../http";
import {IItem} from "../types/item";

class CartService {
    static readCartById(id: number): Promise<AxiosResponse<ICart>> {
        return api.get(`/carts/${id}`);
    }

    static addItemToCart(cartId: number, item: IItem): Promise<AxiosResponse> {
        return api.post(`/carts/${cartId}/add-product`, item);
    }

    static deleteItemFromCart(cartId: number, productId: number): Promise<AxiosResponse> {
        return api.delete(`/carts/${cartId}/delete-product`, {
            params: {
                productId: productId
            }
        });
    }
}

export default CartService;
