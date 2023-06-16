import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {ICategory} from "../../types/category";
import CategoryService from "../../service/CategoryService";
import {ErrorContext} from "../../index";

const CreateCategoryForm = (props: { handleReRender: () => void }) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: {errors, isValid}
    } = useForm<ICategory>({mode: 'onTouched'});
    const {showError} = useContext(ErrorContext);


    const createCategory = (category: ICategory) => {
        category.name = category.name.trim();
        CategoryService.create(category)
            .then(() => {
                reset();
                props.handleReRender();
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

    return (
        <form onSubmit={(event) => void handleSubmit(createCategory)(event)} className="row">
            <label htmlFor="create-category-name" className="form-label">Product category name:</label>
            <input type="text"
                   {...register('name',
                       {
                           required: "Name of category is required",
                           maxLength: {
                               value: 20,
                               message: "Max length of category name is 20 characters"
                           },
                           validate: value => !!value.trim() || "Name cannot be empty"
                       }
                   )}
                   maxLength={20}
                   className="form-control col mx-2"
                   id="create-category-name"/>
            <div className="col">
                <button type="submit" className="btn btn-success" disabled={!isValid}>ADD</button>
            </div>
            <p className="form-text text-danger">
                {errors.name?.message}
            </p>
        </form>
    )
        ;
};

export default CreateCategoryForm;