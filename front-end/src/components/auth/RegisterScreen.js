import React from 'react';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { startLoginGoogle, startRegistration } from '../../actions/auth';
import { Header } from '../ui/Header';
import { Footer } from '../ui/Footer';
import { GoogleLogin } from 'react-google-login';

export const RegisterScreen = () => {

    const [formValues, handleInputChange] = useForm({name:'', email:'', password1:'', password2:''})
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(password1.length < 6){
            return Swal.fire('Error', "Password must contained at least 6 characters", "error")
        }
        if(password1 !== password2){
            return Swal.fire('Error', "Passwords do not match ", "error")
        }
        if(email.length <= 0 || name.length <= 0){
            return Swal.fire('Error', `${e.target.name.name} is required`, "error")
        }
        dispatch(startRegistration({name, email, password1}))
        
    }

    const {name, email, password1, password2} = formValues;  

    const handleRegisterGoogle = (googleData) => {

        if (googleData.tokenId){
            dispatch(startLoginGoogle(googleData.tokenId))
        }
    };


    return (
        <>
            <Header/>
            <div className="loginBox">
                <form onSubmit={handleSubmit}>
                    <p className="msgAuth">Sign up</p>
                    <div className="boxInput">
                        <input 
                            autoComplete="nope" 
                            className="inputForm"
                            type="text" 
                            name="name"
                            onChange={handleInputChange}
                            value={name}
                        />
                        <span className={ (name.length === 0) ? "placeholder" : "placeholder placeholderWithText"}> Name </span>
                    </div>
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
                            autoComplete="off"
                            className="inputForm"
                            type="password" 
                            name="password1"
                            onChange={handleInputChange}
                            value={password1}
                        />
                        <span className={ (password1.length === 0) ? "placeholder" : "placeholder placeholderWithText"}> Password </span>
                    </div>
                    <div className="boxInput">
                    <input
                        autoComplete="off"
                        className="inputForm"
                        type="password" 
                        name="password2"
                        onChange={handleInputChange}
                        value={password2}
                        /> 
                        <span className={ (password2.length === 0) ? "placeholder" : "placeholder placeholderWithText"}> Repeat Password </span>
                    </div>
                    <input type="submit" value="REGISTER"/>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign up with Google"
                        onSuccess={handleRegisterGoogle}
                        onFailure={handleRegisterGoogle}
                        cookiePolicy={'single_host_origin'}
                    />              
                </form>
            </div>
            <Footer/>
        </>
    )
}
