import React, {useContext, useEffect, useState} from 'react';
import UsersTable from "./UsersTable";
import CreateAdminModal from "./CreateAdminModal";
import {IUser} from "../../types/user";
import UserService from "../../service/UserService";
import {AuthContext, ErrorContext} from "../../index";
import {observer} from "mobx-react";

const Users = observer(() => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [reRender, setReRender] = useState<boolean>(false);
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);

    useEffect(() => {
        if (store.isAdmin()) {
            UserService.readAll()
                .then(res => setUsers(res.data))
                .catch(reason => {
                    console.log(reason);
                    showError(reason?.response?.data?.message);
                });
        }
    }, [showError, reRender, store, store.userRole])

    const handleReRender = () => {
        setReRender(!reRender);
    }

    return (
        <div className="container">
            <div className="row mb-3 mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createAdminModal">
                        ADD ADMIN
                    </button>
                </div>
                <CreateAdminModal handleReRender={handleReRender}/>
            </div>
            <h2 className="mb-3">USERS</h2>
            <UsersTable users={users}/>
        </div>
    );
});

export default Users;