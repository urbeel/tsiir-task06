import React, {FormEvent, useContext, useEffect, useState} from 'react';
import {IProduct} from "../../types/product";
import ProductService from "../../service/ProductService";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext, ErrorContext} from "../../index";
import {observer} from "mobx-react";
import CartService from "../../service/CartService";
import {IItem} from "../../types/item";

const Product = observer(() => {
    const [product, setProduct] = useState<IProduct>();
    const [quantity, setQuantity] = useState<number | null>(1);
    const {id} = useParams();
    const {store} = useContext(AuthContext);
    const navigate = useNavigate();
    const {showError} = useContext(ErrorContext);


    useEffect(() => {
        if (id) {
            ProductService.readById(parseInt(id))
                .then(response => setProduct(response.data))
                .catch(reason => {
                    console.log(reason);
                });
        }
    }, [id]);

    const addItemToCart = (e: FormEvent) => {
        e.preventDefault();
        if (store.userId && product && quantity) {
            const item: IItem = {
                product: product,
                quantity: quantity
            }
            CartService.addItemToCart(store.userId, item)
                .then(() => {
                    navigate('/cart');
                })
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message);
                });
        }
    }

    return (
        product ?
            <div className="container">
                <div className="card m-3">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={product.photoUrl} width="100%" className="img-fluid rounded-start"
                                 style={{objectFit: "scale-down", height: "600px"}} alt="{{product.name}}"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body h-100 d-flex flex-column justify-content-around">
                                <h5 className="card-title"><strong>{product.name}</strong></h5>
                                <span className="text-body-secondary">Category: {product.category.name}</span>
                                {product.description &&
                                    <p className="text-body-secondary">
                                        Description:<br/>
                                        {product.description}
                                    </p>
                                }
                                <p className="card-text">Price:
                                    <strong>
                                        {(product.price / 100).toFixed(2)} $
                                    </strong>
                                </p>
                                <p className="card-text">In Stock: <strong>{product.quantity}</strong></p>
                                {
                                    store.isCustomer() &&
                                    <form onSubmit={addItemToCart}>
                                        <div className="row row-cols-3 gx-5">
                                            <div className="col">
                                                <div className="row">
                                                    <label htmlFor="p-quantity"
                                                           className="form-label col">Quantity:</label>
                                                    <input type="number" id="p-quantity"
                                                           className="form-control col"
                                                           style={{width: "100px"}}
                                                           value={quantity ? quantity : ""}
                                                           onChange={(e) => {
                                                               if (e.target.valueAsNumber) {
                                                                   setQuantity(e.target.valueAsNumber);
                                                               } else {
                                                                   setQuantity(null);
                                                               }
                                                           }}
                                                           min="1" max={product.quantity} required/>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <input type="submit" value="Add To Cart"
                                                       className="btn btn-success align-self-center align-self-sm-start"
                                                       style={{width: "200px"}}/>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="text-center mt-5">
                <h1>Product not found</h1>
            </div>
    );
});

export default Product;