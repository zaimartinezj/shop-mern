import { types } from "../types/types";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import Swal from "sweetalert2";


export const startRegistration = ({name, email, password1}) => {

    return async (dispatch) => {
       
        const userForm = {name, email, password: password1};

        const res = await fetchWithoutToken('auth/new', userForm, 'POST');
        const data = await res.json();

        if(data.success){

        localStorage.setItem('token', data.token);
        dispatch(login({name, uid: data.uid}));
        }else{
            Swal.fire('error', data.msg, 'error');
            
        }
        
    }
}

export const startLogin = ({email, password}) => {

    return async (dispatch) => {    
        const user = {email, password};
        const res = await fetchWithoutToken('auth/login', user, 'POST');
        const data = await res.json();

        if (data.success){
            localStorage.setItem('token', data.token);
            dispatch(login({name: data.name, uid: data.uid}));
        }else{
            Swal.fire('error', data.msg, 'error');
        }
    }
}

export const startLoginGoogle = (tokenId) => {
    return async (dispatch) => {
        const response = await fetchWithoutToken('auth/google', {googleToken: tokenId}, 'POST')
        const data = await response.json()

        if (data.success){
            localStorage.setItem('token', data.token);
            dispatch(login({name: data.name, uid: data.uid}));
        }else{
            Swal.fire('error', data.msg, 'error');
        }
    }
}


const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const logout = () => ({
    type: types.authLogout
})

export const startChecking = () => {

    return async (dispatch) => {

        const res = await fetchWithToken('auth/renew');
        const data = await res.json();

        if(data.success){
    
            dispatch(login({name:data.name, uid: data.uid}))
            localStorage.setItem('token', data.token)
            
        }else{
            
            localStorage.removeItem('token'); // token expiro    
            dispatch(authCheckingFinish());
        }


    }
}

export const authCheckingFinish = () => ({
    type: types.authCheckingFinish
})
