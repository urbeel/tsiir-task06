import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, ErrorContext} from "../../index";
import OrderService from "../../service/OrderService";
import {IOrder} from "../../types/order";
import OrdersList from "../orders/OrdersList";
import {observer} from "mobx-react";

const MyOrders = observer(() => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        if (store.userId && store.isCustomer()) {
            OrderService.readAllByUserId(store.userId)
                .then(res => {
                    setOrders(res.data);
                })
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message)
                });
        }
    }, [store.userId, store, showError])

    return (
        <div className="container">
            <h1 className="my-4">My orders</h1>
            <OrdersList orders={orders}/>
        </div>
    );
});

export default MyOrders;