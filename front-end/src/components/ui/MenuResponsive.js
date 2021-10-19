import React from 'react'
import { NavLink } from './NavLinkStyle';


export const MenuResponsive = () => {
    return (
        <div className="menu-responsive">
            <NavLink className="link active" to="/" >Home</NavLink>
            <NavLink className="link " to="/">News</NavLink>
            <NavLink className="link " to="/">Contact</NavLink>
            <NavLink className="link " to="/">About</NavLink>
        </div>
    )
}

