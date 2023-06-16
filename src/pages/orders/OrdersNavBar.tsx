import React from 'react';
import {Link} from "react-router-dom";

const OrdersNavBar = () => {
    return (
        <nav>
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <Link to="/orders/new" className="nav-link">NEW</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/accepted" className="nav-link">ACCEPTED</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/finished" className="nav-link">FINISHED</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/canceled" className="nav-link">CANCELED</Link>
                </li>
            </ul>
        </nav>
    );
};

export default OrdersNavBar;