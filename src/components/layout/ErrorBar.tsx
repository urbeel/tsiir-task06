import React, {useContext} from 'react';
import {ErrorContext} from "../../index";
import {observer} from "mobx-react";

const ErrorBar = observer(() => {
    const {errorMessage} = useContext(ErrorContext);

    return (
        <section>
            {errorMessage &&
                <div className="alert alert-danger alert-dismissible">
                    <h4 className="text-center">{errorMessage}</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }
        </section>
    )
        ;
});

export default ErrorBar;