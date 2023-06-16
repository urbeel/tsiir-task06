import React, {ReactNode, useMemo, useState} from 'react';
import {ErrorContext} from "../index";

const ErrorProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>('');

    const showError = (message: string) => {
        setErrorMessage(message);
    }

    const providerValue = useMemo(() =>
        ({errorMessage: errorMessage, showError: showError}), [errorMessage]);

    return (
        <ErrorContext.Provider value={providerValue}>
            {children}
        </ErrorContext.Provider>
    );
};

export default ErrorProvider;