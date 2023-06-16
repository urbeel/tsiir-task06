import React, {useCallback, useContext, useEffect} from 'react';
import {UserRole} from "../types/enums/userRole";
import {AuthContext} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

const RequireAuth = observer((props: { children: React.ReactElement, role: UserRole }) => {
    const {store} = useContext(AuthContext);
    const navigate = useNavigate();

    const isValidRole = useCallback((): boolean => {
        if (localStorage.getItem('auth-token') && !store.isAuth) {
            return true;
        }
        switch (props.role) {
            case UserRole.ADMIN:
                return store.isAdmin();
            case UserRole.CUSTOMER:
                return store.isCustomer();
            default: {
                return false;
            }
        }
    }, [props.role, store]);

    useEffect(() => {
        if (!isValidRole()) {
            navigate("/");
        }
    }, [isValidRole, navigate, store.userRole])

    return (
        isValidRole() ?
            props.children
            :
            <h1>ACCESS DENIED</h1>
    );
});

export default RequireAuth;