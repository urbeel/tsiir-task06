import React, {useContext, useEffect, useState} from 'react';
import ProductList from "../../components/ProductList";
import {IProduct} from "../../types/product";
import ProductService from "../../service/ProductService";
import CreateProductModal from "./CreateProductModal";
import {AuthContext, ErrorContext} from "../../index";
import {observer} from "mobx-react";

const Products = observer(() => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [reRender, setReRender] = useState<boolean>(false);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        if (store.isAdmin()) {
            ProductService.readAll()
                .then(res => setProducts(res.data))
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message);
                });
        }
    }, [reRender, showError, store, store.userRole])

    const handleReRender = () => {
        setReRender(!reRender);
    }

    return (
        <div className="container">
            <div className="mb-3 mt-5">
                <button className="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#createProductModal">Add product
                </button>
                <CreateProductModal
                    handleReRender={handleReRender}/>
            </div>
            <ProductList
                products={products}
                handleReRender={handleReRender}
            />
        </div>
    );
});

export default Products;