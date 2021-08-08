import React from 'react';
import { Redirect } from "react-router-dom";

function AuthGard({ component }) {
    const user = localStorage.getItem('user')
    
    if(!user)
        return (
            <>
                <Redirect to="/login" />
            </>
        )
    return (<> {component} </>)
}

export default AuthGard