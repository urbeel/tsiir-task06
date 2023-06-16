import React from 'react';
import {Link} from "react-router-dom";

const AdminBar = (props: { className?: string }) => {
    return (
        <nav className={props.className}>
            <h1 className="mb-4">Admin bar</h1>
            <ul className="nav nav-underline">
                <li className="nav-item">
                    <Link to="/categories" className="nav-link">PRODUCT CATEGORIES</Link>
                </li>
                <li className="nav-item">
                    <Link to="/products" className="nav-link">PRODUCTS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link">USERS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/new" className="nav-link">NEW ORDERS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/accepted" className="nav-link">ACCEPTED ORDERS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/finished" className="nav-link">FINISHED ORDERS</Link>
                </li>
                <li className="nav-item">
                    <Link to="/orders/canceled" className="nav-link">CANCELED ORDERS</Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminBar;