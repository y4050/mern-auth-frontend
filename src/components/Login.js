// Imports
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';


const { REACT_APP_SERVER_URL } = process.env;

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };

        axios.post(`${REACT_APP_SERVER_URL}/users/login`, userData)
        .then(response => {
            const { token } = response.data;
            // save token to local storage
            localStorage.setItem('jwtToken', token);
            // set token to headers
            setAuthToken(token);
            // decode token to get the user data
            const decoded = jwt_decode(token);
            // set the current user
            props.nowCurrentUser(decoded); // function passed down as props.
        })
        .catch(error => {
            console.log('>>>>> Error on login', error);
            alert('Either email or password is incorrect. Please try again');
        });
    }

    props.user ? <Redirect to='/profile' /> : <Redirect to='/login' />

    return (
        <div className="row mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <lable htmlFor="email">Email</lable>
                    <input type="email" name="email" value={email} onChange={handleEmail} className="form-control"/>
                </div>
                <div className="form-group">
                    <lable htmlFor="password">Password</lable>
                    <input type="password" name="password" value={password} onChange={handlePassword} className="form-control"/>
                </div>
                    <button type="sumbit" className="btn btn-primary float-right">Submit</button>
            </form>
        </div>
    )
}

export default Login;
