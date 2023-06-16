import React, {useContext, useEffect, useState} from 'react';
import {IProduct} from "../../types/product";
import ProductService from "../../service/ProductService";
import AdminBar from "./AdminBar";
import {AuthContext} from "../../index";
import {observer} from "mobx-react";
import ProductList from "../../components/ProductList";

const Home = observer(() => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const {store} = useContext(AuthContext);

    useEffect(() => {
        if (!store.isAdmin()) {
            ProductService.readProductsInStock()
                .then((response) => {
                    setProducts(response.data);
                })
                .catch(reason => {
                    console.log(reason);
                });
        }
    }, [store, store.userRole]);

    return (
        <div className="container p-4">
            {
                store.isAdmin() ?
                    <AdminBar/>
                    :
                    <ProductList products={products}/>
            }
        </div>
    );
});

export default Home;