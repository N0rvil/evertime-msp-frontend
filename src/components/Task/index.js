// third party
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// pages
// components
import BigInput from "../../components/BigInput";
import CheckInput from "../../components/CheckInput";
// styles

// Input for big froms like singIn
// placeholder is like normal placeholder
// type is like normal type
// onChange is callback function like onChange
// value is the same like value on normal input in most cases use the hook
const IsDone = (done) => {
	if (done) {
		return "taskContainer done";
	} else {
		return "taskContainer not";
	}
};

const date = (task) => {
    if (((task - new Date().getTime()) / 24 / 3600000).toFixed(2) <= 0) {
        return "expired"
    } else {
        return ((task - new Date().getTime()) / 24 / 3600000).toFixed(2)
    }
};

const changetext = (doneOrNot) => {
    if (!doneOrNot) {
        return "Done";
    } else {
        return "Undone";
    }
}





const ViewTask = ({ task }) => {

    // custom hooks
    const [done, setDone] = useState("");
    const [error, setError] = useState('');
    // handleSubmit function on submit will send request on login or register
    const handleSubmit = (e) => {
        e.preventDefault();
        // hitting the signin endpoint, passing username and password
        axios({
            method: 'POST',
            url: `http://localhost:3005/done`,
            data: {
                done,
            }
        })
        .then(res => {
            setError(res.data.note);
        })
        .then(() => {
                reset()
        })
        .catch(err => {
            console.log(err);
        });
    };
    const reset = () => {
		done("");
    };


	return (
		<div className={IsDone(task.done)}>
			<h3>{task.description}</h3>
            <h3>{date(task.duration)}</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <CheckInput
                    checked={task.done}
					onChange={setDone}
					type={"checkbox"}
					value={task._id}
                />
                <BigInput
					onChange={setDone}
					placeholder={changetext(task.done)}
					type={"submit"}
				/>
            </form>
            <h3>{error}</h3>  
		</div>
	);
};

export default ViewTask;
