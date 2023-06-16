import React, {useContext, useEffect, useState} from 'react';
import {IOrder} from "../../types/order";
import {OrderStatus} from "../../types/enums/orderStatus";
import OrderService from "../../service/OrderService";
import moment from "moment/moment";
import {AuthContext, ErrorContext} from "../../index";

const OrderCard = (props: { order: IOrder, handleReRender?: () => void }) => {
    const [order, setOrder] = useState<IOrder>(props.order);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        setOrder(props.order);
    }, [props.order])

    const changeOrderStatus = (orderId: number, newStatus: OrderStatus) => {
        OrderService.changeOrderStatus(order.id, newStatus)
            .then(() => {
                props.handleReRender?.();
            })
            .catch(reason => {
                console.log(reason);
                showError(reason?.response?.data?.message)
            });
    }

    return (
        <div className="card mb-2">
            <div className="card-header">
                <div className="row">
                    <h5 className="col">
                        {moment(order.orderTime).format('MMMM Do YYYY, HH:mm')}
                    </h5>
                    {store.isAdmin() ?
                        <>
                            <h5 className="col">Email: {order.user.email}</h5>
                            <h5 className="col">Phone: {order.user.phone}</h5>
                            <h5 className="col">Address: {order.user.address}</h5>
                            <h5 className="col">Full Name: {order.user.firstname} {order.user.lastname}</h5>
                        </>
                        :
                        <h5 className="col text-end">Status: {order.status}</h5>
                    }
                </div>
            </div>
            <div className="card-body">
                <table className="table table-hover">
                    <caption>Ordered products</caption>
                    <thead className="table-header">
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.items.map(item =>
                        <tr key={item.product.id}>
                            <td>{item.product.id}</td>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.product.price / 100}</td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={4} className="card-text text-end">
                            <strong className="fs-5">Total Price: ${(order.totalPrice / 100).toFixed(2)}</strong>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            {(store.isAdmin() &&
                    (order.status.toUpperCase() === OrderStatus.NEW.toUpperCase()
                        || order.status.toLocaleUpperCase() === OrderStatus.ACCEPTED.toUpperCase()
                    )) &&
                <div className="card-footer d-flex justify-content-between">
                    {order.status.toUpperCase() === OrderStatus.NEW.toUpperCase() &&
                        <button onClick={() => changeOrderStatus(order.id, OrderStatus.ACCEPTED)}
                                className="btn btn-success">
                            Accept
                        </button>
                    }
                    {order.status.toUpperCase() === OrderStatus.ACCEPTED.toUpperCase() &&
                        <button onClick={() => changeOrderStatus(order.id, OrderStatus.FINISHED)}
                                className="btn btn-success">
                            Finish
                        </button>
                    }
                    <button onClick={() => changeOrderStatus(order.id, OrderStatus.CANCELED)}
                            className="btn btn-danger">
                        Cancel
                    </button>
                </div>
            }
        </div>
    );
};

export default OrderCard;