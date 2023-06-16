import React, {useEffect, useState} from 'react';
import {IOrder} from "../../types/order";
import OrderCard from "./OrderCard";

const OrdersList = (props: { orders: IOrder[], handleReRender?: () => void }) => {
    const [orders, setOrders] = useState<IOrder[]>(props.orders);

    useEffect(() => {
        setOrders(props.orders);
    }, [props.orders]);

    return (
        orders.length === 0 ?
            <div className="text-center mt-3"><h1>Orders not found</h1></div>
            :
            <div>
                {orders.map(order =>
                    <OrderCard
                        key={order.id}
                        order={order}
                        handleReRender={props.handleReRender}
                    />
                )}
            </div>
    );
};

export default OrdersList;