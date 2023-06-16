import React, {useContext, useEffect} from 'react';
import {AuthContext, ErrorContext} from "../index";
import api from "./index";
import {useNavigate} from "react-router-dom";

const WithAxios = (props: { children: React.ReactElement }) => {
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);
    const navigate = useNavigate();

    useEffect(() => {
        api.interceptors.response.use(
            response => response,
            async (error) => {
                if (error.code === 'ERR_NETWORK') {
                    showError("Connection to the server is broken");
                    return Promise.reject(error);
                }
                if (error.response.status === 401) {
                    showError("Session is expired. Please, login again");
                    store.logout();
                    navigate('/login');
                }
                return Promise.reject(error);
            });
    }, [navigate, showError, store])

    return props.children;
};

export default WithAxios;