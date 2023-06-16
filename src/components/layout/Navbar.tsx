import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../index";
import {observer} from "mobx-react";

const Navbar = observer(() => {
    const {store} = useContext(AuthContext);

    return (
        <nav className="navbar bg-dark navbar-dark navbar-expand">
            <div className="container d-flex">
                <Link to="/" className="navbar-brand">Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {store.isAuth ?
                            <>
                                {store.isCustomer() &&
                                    <>
                                        <li className="nav-item">
                                            <Link to="/cart" className="nav-link btn btn-link">CART</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/my-orders" className="nav-link btn btn-link">MY ORDERS</Link>
                                        </li>
                                    </>
                                }
                                <li className="nav-item">
                                    <button onClick={() => store.logout()} className="nav-link btn btn-link">LOGOUT
                                    </button>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <Link to="/login" className="nav-link btn btn-link">LOGIN</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;