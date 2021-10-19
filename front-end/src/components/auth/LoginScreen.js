import React from 'react'
import { useForm } from '../../hooks/useForm';
import "./auth.css";
import {useDispatch } from 'react-redux';
import { startLogin, startLoginGoogle } from '../../actions/auth';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GoogleLogin } from 'react-google-login';

export const LoginScreen = () => {
    const [formValues, handleInputChange] = useForm({email:'', password:''});
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.length > 0 && password.length > 0){
            dispatch(startLogin({email, password}));
        }else{
            Swal.fire('Error', 'Invalid credentials', 'error');
        }    
    }

    const {email, password} = formValues;  

    const handleLogin = (googleData) => {

        if (googleData.tokenId){
            dispatch(startLoginGoogle(googleData.tokenId))
        }
    };


    return (
        <>
        <Header/>
            <div autoComplete="off" className="loginBox">
                <form onSubmit={handleSubmit}>
                    <h3 className="msgAuth">SIGN IN</h3>
                    <div className="boxInput">
                        <input 
                        className="inputForm"
                        type="email" 
                        name="email"
                        onChange={handleInputChange}
                        value={email}
                        />
                        <span className={ (email.length === 0) ? "placeholder" : "placeholder placeholderWithText"}> Email </span>
                    </div>
                    
                    <div className="boxInput">
                        <input 
                            className="inputForm"
                            type="password" 
                            name="password"
                            onChange={handleInputChange}
                            value={password}/>
                        <span className={ (password.length === 0) ? "placeholder" : "placeholder placeholderWithText"}> Password </span>
                    </div>
                    <input type="submit" value="LOGIN"/>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />  
                    <p>Don't have an account? <NavLink className="navlink" to="/auth/register">Sign up</NavLink></p>      
                

                </form>

               

            </div>
            <Footer/>
        </>
    )
}
