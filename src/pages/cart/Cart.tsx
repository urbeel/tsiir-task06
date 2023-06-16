import React, {useContext, useEffect, useState} from 'react';
import {ICart} from "../../types/cart";
import CartService from "../../service/CartService";
import {AuthContext, ErrorContext} from "../../index";
import CartItemCard from "./CartItemCard";
import {observer} from "mobx-react";
import OrderService from "../../service/OrderService";
import {IOrder} from "../../types/order";
import {IUser} from "../../types/user";
import {useNavigate} from "react-router-dom";

const Cart = observer(() => {
    const [cart, setCart] = useState<ICart | null>(null)
    const [reRender, setReRender] = useState<boolean>(false);
    const {store} = useContext(AuthContext);
    const navigate = useNavigate();
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        if (store.userId && store.isCustomer()) {
            CartService.readCartById(store.userId)
                .then(res => {
                    setCart(res.data);
                })
                .catch(reason => {
                    console.log(reason);
                });
        }
    }, [store.userId, reRender, store])

    const handleReRender = () => {
        setReRender(!reRender);
    }

    const createOrder = () => {
        if (cart) {
            const order = {
                user: {
                    id: cart.id
                } as IUser,
                items: cart.items
            } as IOrder;
            OrderService.createOrder(order)
                .then(() => {
                    handleReRender();
                    navigate('/my-orders')
                })
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message)
                });
        }
    }

    return (
        <div className="container">
            {
                cart &&
                <div className="row mt-md-5 mt-3 gx-5">
                    {cart.items.length === 0 &&
                        <div className="text-center">
                            <h1>Cart is empty</h1>
                        </div>
                    }
                    <div className="col-12 col-md-8 order-2 order-md-1">
                        {cart.items.map(item =>
                            <CartItemCard
                                key={item.product.id}
                                item={item}
                                handleReRender={handleReRender}
                            />
                        )}
                    </div>
                    <div className="col-12 col-md-4 order-1 order-md-2 mb-4 d-flex flex-column align-items-center">
                        <h4 className="mb-3">
                            Total price: ${(cart.totalPrice / 100).toFixed(2)}
                        </h4>
                        {cart.items.length !== 0 &&
                            <div className="col-12 col-md-6">
                                <button onClick={() => createOrder()} className="btn btn-primary form-control">
                                    Order
                                </button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
});

export default Cart;