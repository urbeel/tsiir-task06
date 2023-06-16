import React, {useContext, useState} from 'react';
import {IProduct} from "../types/product";
import {Link} from "react-router-dom";
import {AuthContext, ErrorContext} from "../index";
import ProductService from "../service/ProductService";
import UpdateQuantityModal from "../pages/products/UpdateQuantityModal";
import {observer} from "mobx-react";

const ProductCard = observer((props: {
    product: IProduct,
    handleReRender?: () => void
}) => {
    const [product] = useState<IProduct>(props.product);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    const deleteProduct = (productId: number) => {
        ProductService.delete(productId)
            .then(() => {
                props.handleReRender?.();
            })
            .catch(reason => {
                showError(reason.response.data.message);
                console.log(reason);
            });
    }

    return (
        <div className="col p-5 p-sm-2">
            <UpdateQuantityModal
                product={product}
                handleReRender={props.handleReRender}
            />
            <div className="card h-100">
                <Link to={`/products/${product.id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
                    <img src={product.photoUrl} alt={product.name} className="card-img-top"
                         style={{objectFit: "scale-down"}} height="200" width="200"/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-secondary">{product.category.name}</p>
                </div>
                <div className="card-footer align-content-end">
                    <div className="text-body-secondary d-flex justify-content-between">
                        <span>Quantity: {product.quantity}</span>
                        <span className="fw-bold">{(product.price / 100).toFixed(2)}$</span>
                    </div>
                    {store.isAdmin() &&
                        <div className="mt-3 d-flex justify-content-between">
                            <div>
                                <button className="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target={`#updateQuantityModal${product.id}`}>Quantity
                                </button>
                            </div>
                            <div>
                                <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">DELETE
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default ProductCard;