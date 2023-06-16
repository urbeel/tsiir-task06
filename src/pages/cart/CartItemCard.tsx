import React, {useContext, useState} from 'react';
import {IItem} from "../../types/item";
import CartService from "../../service/CartService";
import {AuthContext, ErrorContext} from "../../index";

const CartItemCard = (props: {
    item: IItem,
    handleReRender: () => void
}) => {
    const [item] = useState(props.item);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    const deleteItemFromCart = (productId: number) => {
        if (store.userId) {
            CartService.deleteItemFromCart(store.userId, productId)
                .then(() => {
                    props.handleReRender();
                })
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message)
                });
        }
    }

    return (
        <div className="card mb-3 p-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={item.product.photoUrl} width="200" height="200"
                         style={{objectFit: "scale-down", height: "200px"}}
                         className="img-fluid rounded-start"
                         alt={item.product.name}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body h-100 d-flex flex-column justify-content-around">
                        <h5 className="card-title"><strong>{item.product.name}</strong></h5>
                        <span className="text-body-secondary">
                                            Category: {item.product.category.name}
                                        </span>
                        <p className="card-text">
                            Price:
                            <strong style={{marginLeft: 5}}>
                                ${(item.product.price / 100).toFixed(2)}
                            </strong>
                        </p>
                        <p className="card-text">Quantity: <strong>{item.quantity}</strong></p>
                        <button onClick={() => deleteItemFromCart(item.product.id)} className="btn btn-danger">
                            DELETE FROM CART
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;