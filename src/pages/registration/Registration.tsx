import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../types/user";
import AuthService from "../../service/AuthService";
import {ErrorContext} from "../../index";

function Registration() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors, isValid}
    } = useForm<IUser>({mode: 'onTouched'});
    const navigate = useNavigate();
    const {showError} = useContext(ErrorContext);

    const registerUser: SubmitHandler<IUser> = (user: IUser) => {
        delete user.confirmPassword;
        AuthService.register(user)
            .then(() => {
                navigate('/login');
            })
            .catch(reason => {
                if (reason?.code === 'ERR_NETWORK') {
                    showError("Connection to the server is broken");
                } else {
                    showError(reason?.response?.data?.message)
                    console.log(reason);
                }
            });
    }

    return (
        <div className="row card mt-5 mb-4 p-4 mx-auto" style={{width: "500px"}}>
            <h1 className="mb-3 text-center">SIGN UP</h1>
            <form onSubmit={(event) => void handleSubmit(registerUser)(event)}>
                <label className="form-label" htmlFor="u-name">Email</label>
                <input type="email"
                       {...register(
                           'email',
                           {
                               required: 'Email is required',
                               maxLength: {value: 60, message: "Max length of email is 60 characters"}
                           }
                       )}
                       id="u-name"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.email?.message}</p>
                <label className="form-label" htmlFor="u-firstname">First name</label>
                <input type="text"
                       {...register(
                           'firstname',
                           {
                               required: 'Firstname is required',
                               maxLength: {value: 45, message: "Max length of firstname is 45 characters"}
                           }
                       )}
                       id="u-firstname"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.firstname?.message}</p>
                <label className="form-label" htmlFor="u-lastname">Last name</label>
                <input type="text"
                       {...register(
                           'lastname',
                           {
                               required: 'Lastname is required',
                               maxLength: {value: 45, message: "Max length of lastname is 45 characters"}
                           }
                       )}
                       id="u-lastname"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.lastname?.message}</p>
                <label className="form-label" htmlFor="u-phone">Phone number</label>
                <input type="text"
                       {...register(
                           'phone',
                           {
                               required: 'Phone number is required',
                               maxLength: {value: 20, message: "Max length of phone number is 20 characters"},
                               pattern: {
                                   value: /\(?(\d{3})\)?([ .-]?)(\d{3})\2(\d{4})/,
                                   message: 'Invalid phone format'
                               }
                           }
                       )}
                       id="u-phone"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.phone?.message}</p>
                <label className="form-label" htmlFor="u-address">Address</label>
                <input type="text"
                       {...register(
                           'address',
                           {
                               required: 'Address is required',
                               maxLength: {value: 255, message: "Max length of address is 255 characters"}
                           }
                       )}
                       id="u-address"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.address?.message}</p>
                <label className="form-label" htmlFor="pass">Password</label>
                <input type="password"
                       {...register('password', {
                               required: 'Password is required',
                               minLength: {value: 6, message: "Min length of password is 6 characters"},
                               maxLength: {value: 16, message: "Max length of password is 16 characters"}
                           }
                       )}
                       id="pass"
                       className="form-control mb-2"/>
                <p className="text-danger">{errors.password?.message}</p>
                <label className="form-label" htmlFor="confirm-pass">Confirm password</label>
                <input type="password"
                       {...register("confirmPassword", {
                           required: "Confirming password is required",
                           validate: (value) => {
                               if (watch('password') !== value) {
                                   return "Passwords do not match";
                               }
                           }
                       })
                       }
                       name="confirmPassword"
                       id="confirm-pass"
                       className="form-control mb-3"/>
                <p className="text-danger">{errors.confirmPassword?.message}</p>
                <div className="d-flex justify-content-center">
                    <button type="submit" disabled={!isValid} className="btn btn-primary">
                        SIGN UP
                    </button>
                </div>
            </form>
            <span className="mt-4 text-center">Already have account? <strong className="mx-2">
                <Link to='/login'>Log in</Link></strong>
            </span>
        </div>
    )
        ;
}

export default Registration;