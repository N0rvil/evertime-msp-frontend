import React from 'react';
// third party 
import { Link } from 'react-router-dom';
// pages
// components
// styles

const Navbar = () => {
    return (
        <nav>
            <Link to='/leaderboard'>
                <h3>leaderboard</h3>
            </Link>
            <Link to='/tasks'>
                <h3>tasks</h3>
            </Link>
        </nav>
    );
};

export default Navbar;
