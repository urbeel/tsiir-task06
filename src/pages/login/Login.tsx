import React, {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {ILoginData} from "../../types/loginData";
import {AuthContext, ErrorContext} from "../../index";

function Login() {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<ILoginData>({mode: 'onTouched'});
    const navigate = useNavigate();
    const {store} = useContext(AuthContext);
    const {showError} = useContext(ErrorContext);
    const login: SubmitHandler<ILoginData> = (loginData: ILoginData) => {
        store.login(loginData)
            .then(() => {
                navigate('/');
            })
            .catch(reason => {
                if (reason?.code === 'ERR_NETWORK') {
                    showError("Connection to the server is broken");
                } else if (reason?.response?.status === 401) {
                    showError(reason?.response?.data?.message)
                } else {
                    console.log(reason);
                }
            });
    }

    return (
        <div className="container">
            <div className="row card mt-5 p-4 mx-auto" style={{width: "500px"}}>
                <h1 className="mb-3 text-center">LOGIN</h1>
                <form onSubmit={(event) => void handleSubmit(login)(event)}>
                    <label className="form-label" htmlFor="u-email">Email</label>
                    <input
                        type="text"
                        {...register('email', {required: "Email is required"})}
                        id="u-email"
                        className="form-control mb-2"
                    />
                    <p className="text-danger">{errors.email?.message}</p>

                    <label className="form-label" htmlFor="u-pass">Password</label>
                    <input
                        type="password"
                        {...register('password', {required: "Password is required"})}
                        id="u-pass"
                        className="form-control mb-4"
                    />
                    <p className="text-danger">{errors.password?.message}</p>

                    <div className="row d-flex justify-content-center">
                        <button type="submit" disabled={!isValid} className="btn btn-primary col-6">
                            LOGIN
                        </button>
                    </div>
                </form>
                <span className="mt-3 text-center">Don't have account?<strong className="mx-2">
                    <Link to="/registration">Sign Up</Link></strong>
                </span>
            </div>
        </div>
    );
}

export default Login;