import React from 'react';
import {RiLogoutBoxLine} from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

export const LogoutButton = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    }

    return (
        <div onClick={handleLogout} className="logout">
           <RiLogoutBoxLine />
        </div>
    )
}
