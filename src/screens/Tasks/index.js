// third party 
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// pages
// components
import Navbar from '../../components/Navbar';
import history from '../../history';
// styles

const Tasks = () => {
    const isLoged = useSelector((state) => state.isLoged);
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
    };

    useEffect(() => {
        if (!isLoged) {
            history.push('/notfound');
        }
    }, [isLoged]);

    return (
        <div>
            Tasks
            <button onClick={() => logOut()}>LOGOUT</button>
            <Navbar />
        </div>
    )
}

export default Tasks