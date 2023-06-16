import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import AuthStore from "./contexts/stores/authStore";
import WithAxios from "./http/WithAxios";
import ErrorProvider from "./contexts/ErrorProvider";
import {configure} from "mobx";

interface IStore {
    store: AuthStore,
}

interface IErrorContextProps {
    errorMessage: string | null,
    showError: (message: string) => void
}

const authStore = new AuthStore();

export const AuthContext = createContext<IStore>({store: authStore});
export const ErrorContext = createContext<IErrorContextProps>({
    errorMessage: '',
    showError: () => {
    }
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

configure({enforceActions: 'never'})

root.render(
    <React.StrictMode>
        <AuthContext.Provider value={{store: authStore}}>
            <ErrorProvider>
                <BrowserRouter>
                    <WithAxios>
                        <App/>
                    </WithAxios>
                </BrowserRouter>
            </ErrorProvider>
        </AuthContext.Provider>
    </React.StrictMode>
);
