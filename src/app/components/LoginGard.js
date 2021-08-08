import React from 'react';
import { Redirect } from "react-router-dom";

function LoginGard({ component }) {
    const user = localStorage.getItem('user')
    if(user)
        return (
            <>
                <Redirect to="/home" />
            </>
        )
    return (<> {component} </>)
}

export default LoginGard