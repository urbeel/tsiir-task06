import React, {useContext, useEffect, useState} from 'react';
import {IProduct} from "../../types/product";
import ProductService from "../../service/ProductService";
import {useForm} from "react-hook-form";
import {ErrorContext} from "../../index";

interface IUpdateQuantityForm {
    quantity: number
}

const UpdateQuantityModal = (props: {
    product: IProduct,
    handleReRender?: () => void
}) => {
    const [product, setProduct] = useState(props.product);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<IUpdateQuantityForm>({mode: "onTouched"});
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        setProduct(props.product);
    }, [props.product])

    const changeProductQuantity = (form: IUpdateQuantityForm) => {
        product.quantity = form.quantity;
        ProductService.update(product)
            .then(() => {
                const btnClose = document.getElementById(`btn-close-modal${product.id}`);
                btnClose?.click();
                reset();
                props.handleReRender?.();
            })
            .catch(reason => {
                console.log(reason);
                showError(reason?.response?.data?.message);
            });
    }

    return (
        <div className="modal fade" id={`updateQuantityModal${product.id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(event) => void handleSubmit(changeProductQuantity)(event)}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-basic-title">CHANGE PRODUCT QUANTITY</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    id={`btn-close-modal${product.id}`} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="p-quantity" className="form-label">NEW PRODUCT QUANTITY:</label>
                            <input type="number"
                                   {...register('quantity', {
                                       required: "Quantity is required",
                                       min: {value: 0, message: 'Min value of quantity is 0'},
                                       max: {
                                           value: 2147483647,
                                           message: `Max value of quantity is 2147483647`
                                       },
                                       validate: value => value !== product.quantity || 'Enter new quantity',
                                       valueAsNumber: true
                                   })}
                                   className="form-control mb-2"
                                   id="p-quantity" min="0"
                            />
                            <p className="form-text text-danger">{errors.quantity?.message}</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="submit" disabled={!isValid} className="btn btn-primary">Change</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateQuantityModal;