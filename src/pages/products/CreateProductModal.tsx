import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {IProduct} from "../../types/product";
import {ICategory} from "../../types/category";
import CategoryService from "../../service/CategoryService";
import ProductService from "../../service/ProductService";
import {ErrorContext} from "../../index";

const CreateProductModal = (props: { handleReRender: () => void }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<IProduct>({mode: "onTouched"});
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [photo, setPhoto] = useState<File>();
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        CategoryService.readAll()
            .then(res => {
                setCategories(res.data);
                reset();
            })
            .catch(reason => {
                console.log(reason);
            });
    }, [reset]);

    const createProduct = (product: IProduct) => {
        if (!product.description?.trim()) {
            delete product.description;
        }
        const category = categories.find(category =>
            category.id === product.category.id);
        if (category) {
            product.category = category;
        }
        ProductService.create(product, photo)
            .then(() => {
                props.handleReRender();
                const btnClose = document.getElementById('btn-close-modal');
                btnClose?.click();
                reset();
                setPhoto(undefined);
            })
            .catch(reason => {
                console.log(reason);
                showError(reason?.response?.data?.message);
            });
    }

    const onFileChange = (event: ChangeEvent) => {
        const files: FileList | null = ((event.target) as HTMLInputElement).files;
        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    return (
        <div className="modal fade" id="createProductModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(event) => void handleSubmit(createProduct)(event)}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-basic-title">Create product</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    id="btn-close-modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="p-name" className="form-label">Name: </label>
                                <input type="text"
                                       {...register('name', {
                                           required: 'Product name is required',
                                           maxLength: {value: 50, message: 'Max length of name is 50 characters'},
                                           validate: value => !!value.trim() || 'Name cannot be empty'
                                       })}
                                       id="p-name"
                                       className="form-control"
                                />
                                <p className="form-text text-danger">{errors.name?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="p-price" className="form-label">Price (in cents):</label>
                                <input type="number"
                                       {...register('price', {
                                           required: 'Price is required',
                                           min: {value: 0, message: 'Min value of price is 0'}
                                       })}
                                       id="p-price"
                                       className="form-control"
                                />
                                <p className="form-text text-danger">{errors.price?.message}</p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="p-quantity" className="form-label">Quantity:</label>
                                <input type="number"
                                       {...register('quantity', {
                                           required: 'Quantity is required',
                                           min: {value: 0, message: 'Min value of quantity is 0'}
                                       })}
                                       id="p-quantity"
                                       className="form-control"
                                />
                                <p className="form-text text-danger">{errors.quantity?.message}</p>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="p-category" className="form-label">Category:</label>
                                <select
                                    id="p-category"
                                    {...register('category.id', {
                                        required: 'Category is required',
                                        valueAsNumber: true
                                    })}
                                    className="form-control"
                                    disabled={categories.length === 0}
                                >
                                    {categories.length === 0 ?
                                        <option>
                                            No categories. Add at least one for creating product
                                        </option>
                                        :
                                        categories.map(category =>
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        )
                                    }
                                </select>
                                <p className="form-text text-danger">{errors.category?.message}</p>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="p-photo" className="form-label">Product photo:</label>
                                <input type="file" onChange={onFileChange} accept="image/*" id="p-photo"
                                       className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="p-description" className="form-label">Description:</label>
                                <textarea
                                    {...register('description', {
                                        maxLength: {value: 500, message: 'Max length of description is 500 characters'},
                                        validate: value => (!value || !!value?.trim()) || 'Name cannot be empty'
                                    })}
                                    cols={200}
                                    maxLength={501}
                                    className="form-control"
                                    id="p-description"
                                ></textarea>
                                <p className="form-text text-danger">{errors.description?.message}</p>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="reset" className="btn btn-outline-primary">Reset</button>
                            <button type="submit" className="btn btn-success" disabled={!isValid}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProductModal;