import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {IUser} from "../../types/user";
import AuthService from "../../service/AuthService";
import {ErrorContext} from "../../index";

const CreateAdminModal = (props: { handleReRender: () => void }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors, isValid}
    } = useForm<IUser>({mode: 'onTouched'});
    const {showError} = useContext(ErrorContext);

    const createAdmin = (user: IUser) => {
        delete user.confirmPassword;
        AuthService.createAdmin(user)
            .then(() => {
                props.handleReRender();
                const btnClose = document.getElementById('btn-close-modal');
                btnClose?.click();
                reset();
            })
            .catch(reason => {
                console.log(reason);
                showError(reason?.response?.data?.message);
            });
    }

    return (
        <div className="modal fade" id="createAdminModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(event) => void handleSubmit(createAdmin)(event)}>
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-basic-title">Create admin</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    id="btn-close-modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
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
                            <p className="form-text text-danger">{errors.email?.message}</p>
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
                            <p className="form-text text-danger">{errors.firstname?.message}</p>
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
                            <p className="form-text text-danger">{errors.lastname?.message}</p>
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
                            <p className="form-text text-danger">{errors.password?.message}</p>
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
                                   id="confirm-pass"
                                   className="form-control mb-3"/>
                            <p className="form-text text-danger">{errors.confirmPassword?.message}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" disabled={!isValid} className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateAdminModal;