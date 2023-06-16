import React, {useContext, useEffect, useState} from 'react';
import {ICategory} from "../../types/category";
import CategoryService from "../../service/CategoryService";
import {ErrorContext} from "../../index";

const CategoriesTable = (props: {
    categories: ICategory[],
    setUpdatedCategory: (category: ICategory) => void
    handleReRender: () => void
}) => {
    const [categories, setCategories] = useState<ICategory[]>(props.categories);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        setCategories(props.categories);
    }, [props.categories])

    const deleteCategory = (categoryId: number) => {
        CategoryService.delete(categoryId)
            .then(() => {
                props.handleReRender();
            })
            .catch(reason => {
                showError(reason?.response?.data?.message)
                console.log(reason);
            })
    }

    return (
        categories.length === 0 ?
            <div>
                <h1>Categories not found</h1>
            </div>
            :
            <table className="table">
                <caption>Product categories</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category =>
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <button className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#updateCategoryModal"
                                    onClick={() => {
                                        props.setUpdatedCategory(category);
                                    }}
                            >UPDATE
                            </button>
                        </td>
                        <td>
                            <button onClick={() => deleteCategory(category.id)}
                                    className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
    );
};

export default CategoriesTable;