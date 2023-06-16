import React, {useContext, useEffect, useState} from 'react';
import {ICategory} from "../../types/category";
import {useForm} from "react-hook-form";
import CategoryService from "../../service/CategoryService";
import {ErrorContext} from "../../index";

const UpdateCategoryModal = (props: {
    category: ICategory | undefined,
    handleReRender: () => void
}) => {
    const [category, setCategory] = useState(props.category);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: {errors, isValid}
    } = useForm<ICategory>({mode: 'onTouched'});
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        reset();
        setCategory(props.category);
    }, [props.category, reset])

    const updateCategory = (categoryForm: ICategory) => {
        if (category) {
            categoryForm.id = category.id;
            CategoryService.update(categoryForm)
                .then(() => {
                    props.handleReRender();
                    const btnClose = document.getElementById('btn-close-modal');
                    btnClose?.click();
                })
                .catch(reason => {
                    if (reason.response.status === 409) {
                        setError("name", {message: reason.response.data.message});
                    } else {
                        console.log(reason);
                        showError(reason?.response?.data?.message)
                    }
                });
        }
    }

    return (
        <div className="modal fade" id="updateCategoryModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(event) => void handleSubmit(updateCategory)(event)}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-basic-title">Update
                                category: {category?.name}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    id="btn-close-modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="c-name" className="form-label">Category name:</label>
                            <input type="text"
                                   {...register('name', {
                                       required: "Category name is required",
                                       maxLength: {
                                           value: 20,
                                           message: "Max length of category name is 20 characters"
                                       },
                                       validate: (value) => (!!value.trim() && value.trim() !== category?.name)
                                           || "Enter new category name",
                                   })}
                                   className="form-control" id="c-name"/>
                            <p className="form-text text-danger">{errors.name?.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" disabled={!isValid} className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;