import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import OrdersList from "./OrdersList";
import {IOrder} from "../../types/order";
import OrderService from "../../service/OrderService";
import {OrderStatus} from "../../types/enums/orderStatus";
import OrdersNavBar from "./OrdersNavBar";
import {AuthContext, ErrorContext} from "../../index";
import {observer} from "mobx-react";

const Orders = observer(() => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const {orderStatus} = useParams<{ orderStatus: OrderStatus }>();
    const [reRender, setReRender] = useState<boolean>(false);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        if (orderStatus && store.isAdmin() && Object.values(OrderStatus).includes(orderStatus)) {
            OrderService.readAllByStatus(orderStatus)
                .then((res) => setOrders(res.data))
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message);
                });
        }
    }, [orderStatus, reRender, showError, store, store.userRole]);

    const handleReRender = () => {
        setReRender(!reRender);
    }

    return (
        <div className="container pt-3">
            <OrdersNavBar/>
            <h2 className="mb-3 mt-2">{orderStatus?.toUpperCase()} ORDERS</h2>
            <OrdersList
                orders={orders}
                handleReRender={handleReRender}
            />
        </div>
    );
});

export default Orders;