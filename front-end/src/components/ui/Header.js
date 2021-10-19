import React, { useState } from 'react';
import { CloseMenu } from './CloseMenu';
import { MenuIcon } from './MenuIcon';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LogoutButton } from './LogoutButton';


export const Header = () => {

    const [open, setOpen] = useState(false)
    const user = useSelector( state => state.auth );
    const handleClick = () => {
        setOpen(!open);
    }

    return (
            
                <header>
                        <nav className={open ? `menu-drop` : ''}>
                            <NavLink className="link active" to="/" >HOME</NavLink>
                            <NavLink className="link " to="/cart">Cart</NavLink>
                            {(user.uid) && <NavLink className="link " to="/orders">Orders</NavLink>}

                           { (!user.uid) && 
                           <>
                            <NavLink className="link " to="/auth/login">Sign in</NavLink>
                            <NavLink className="link " to="/auth/register">Sign up</NavLink>
                           </>
                            }

                            {
                                (user.uid) &&
                                <div className="user-data">
                                    <p>Welcome {user.name}</p>
                                    <LogoutButton/> 
                                </div>
                            }
                         
                        </nav>

                            

                            <div className="toggleButton" onClick={handleClick}>
                            {open   ? (<CloseMenu className="menu-icon" />) 
                                    : (<MenuIcon className="menu-icon" />)
                            }
                            </div>
                 
                </header>
              
           
      );
}
