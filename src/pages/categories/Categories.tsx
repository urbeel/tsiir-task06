import React, {useContext, useEffect, useState} from 'react';
import {ICategory} from "../../types/category";
import CategoryService from "../../service/CategoryService";
import CreateCategoryForm from "./CreateCategoryForm";
import CategoriesTable from "./CategoriesTable";
import UpdateCategoryModal from "./UpdateCategoryModal";
import {AuthContext} from "../../index";
import {observer} from "mobx-react";

const Categories = observer(() => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [updatedCategory, setUpdatedCategory] = useState<ICategory>();
    const [reRender, setReRender] = useState<boolean>(false);
    const {store} = useContext(AuthContext);


    useEffect(() => {
        if (store.isAdmin()) {
            CategoryService.readAll()
                .then(res => setCategories(res.data))
                .catch(reason => {
                    console.log(reason);
                });
        }
    }, [reRender, store, store.userRole]);

    const handleReRender = () => {
        setReRender(!reRender);
    }

    return (
        <div className="container pt-4">
            <UpdateCategoryModal
                category={updatedCategory}
                handleReRender={handleReRender}
            />
            <div className="row mb-2">
                <div className="col-md-6 p-0">
                    <CreateCategoryForm
                        handleReRender={handleReRender}
                    />
                </div>
            </div>
            <div className="row">
                <CategoriesTable
                    categories={categories}
                    setUpdatedCategory={setUpdatedCategory}
                    handleReRender={handleReRender}
                />
            </div>
        </div>
    );
});

export default Categories;