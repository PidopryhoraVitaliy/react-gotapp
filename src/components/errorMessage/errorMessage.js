import React from 'react';
import './errorMessage.css';
import img from './error.png'

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt='/this is error img/'></img>
            <span>Error</span>
        </>
    )
}

export default ErrorMessage;

//<img src={process.env.PUBLIC_URL + '/img/error.png'} alt='/this is error img/'></img>