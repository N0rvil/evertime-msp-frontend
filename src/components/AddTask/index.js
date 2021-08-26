// third party 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// pages
// components
import BigInput from '../BigInput/index';
import history from '../../history';
// styles


// Input for big froms like singIn
// placeholder is like normal placeholder
// type is like normal type
// onChange is callback function like onChange
// value is the same like value on normal input in most cases use the hook

const AddTask = () => {
    // Connect on reducer
    const isLoged = useSelector((state) => state.isLoged);
    const dispatch = useDispatch();
    // custom hooks
    const [describtion, setDescribtion] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');
    // handleSubmit function on submit will send request on login or register
    const handleSubmit = (e) => {
        e.preventDefault();
        // hitting the signin endpoint, passing username and password
        axios({
            method: 'POST',
            url: `http://localhost:3005/add-task`,
            data: {
                describtion,
                duration
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
            history.push('/');
        }
    }, [isLoged])

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <BigInput onChange={setDescribtion} placeholder={'Describtion'} type={'text'} value={describtion} />
                <BigInput onChange={setDuration} placeholder={'Duration'} type={'number'} value={duration} />
                <BigInput onChange={setDuration} placeholder={'Add task'} type={'submit'} />
            </form>
            <h3>{error}</h3>            
        </div>

    )
};

export default AddTask;