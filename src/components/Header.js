import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom'

function Header(){
    return (
        <header>
            <ul className="nav-bar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            <a href="">Login</a>
        </header>
    );
}
export default Header;