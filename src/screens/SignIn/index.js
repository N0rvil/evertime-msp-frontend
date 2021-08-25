// third party 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// pages
// components
import BigInput from '../../components/BigInput';
import history from '../../history';
// styles

const SignIn = () => {
    // Connect on reducer
    const isLoged = useSelector((state) => state.isLoged);
    const dispatch = useDispatch();
    // custom hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // handleSubmit function on submit will send request on login or register
    const handleSubmit = (e) => {
        e.preventDefault();
        // hitting the signin endpoint, passing username and password
        axios({
            method: 'POST',
            url: `http://localhost:3005/signin`,
            data: {
                username,
                password
            }
        })
        .then(res => {
            // if user is loged isLoged state is changed to true and user is redirected to tasks screen
            if (res.data.note === 'created' || res.data.note === 'loged') {
                dispatch({ type: 'LOGIN' })
            } else {
                setError(res.data.note);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };
    /////////// END OF HENDLE SUBMIT FUNCTION /////////////
    useEffect(() => {
    // checking if user is loged
        if (isLoged) {
            history.push('/tasks');
        }
    }, [isLoged])

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <BigInput onChange={setUsername} placeholder={'username'} type={'text'} value={username} />
                <BigInput onChange={setPassword} placeholder={'password'} type={'password'} value={password} />
                <BigInput onChange={setPassword} placeholder={'SignIn'} type={'submit'} />
            </form>
            <h3>{error}</h3>
        </div>
    )
};

export default SignIn;