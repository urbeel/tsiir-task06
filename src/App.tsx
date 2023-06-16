import React, {useContext, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Navbar from "./components/layout/Navbar";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import {AuthContext} from "./index";
import Cart from "./pages/cart/Cart";
import Categories from "./pages/categories/Categories";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Orders from "./pages/orders/Orders";
import RequireAuth from "./security/RequireAuth";
import {UserRole} from "./types/enums/userRole";
import PageNotFound from "./pages/PageNotFound";
import ErrorBar from "./components/layout/ErrorBar";
import {observer} from "mobx-react";
import MyOrders from "./pages/my-orders/MyOrders";

const App = observer(() => {
    const {store} = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            store.checkAuth();
        }
    }, [store])

    return (
        <>
            <Navbar/>
            <ErrorBar/>
            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/products/:id" element={<Product/>}/>
                <Route path="/cart" element={
                    <RequireAuth role={UserRole.CUSTOMER}>
                        <Cart/>
                    </RequireAuth>
                }/>
                <Route path="/my-orders" element={
                    <RequireAuth role={UserRole.CUSTOMER}>
                        <MyOrders/>
                    </RequireAuth>
                }/>
                <Route path="/categories" element={
                    <RequireAuth role={UserRole.ADMIN}>
                        <Categories/>
                    </RequireAuth>
                }/>
                <Route path="/products" element={
                    <RequireAuth role={UserRole.ADMIN}>
                        <Products/>
                    </RequireAuth>
                }/>
                <Route path="/users" element={
                    <RequireAuth role={UserRole.ADMIN}>
                        <Users/>
                    </RequireAuth>
                }/>
                <Route path="/orders/:orderStatus" element={
                    <RequireAuth role={UserRole.ADMIN}>
                        <Orders/>
                    </RequireAuth>
                }/>
            </Routes>
        </>
    );
});

export default App;
