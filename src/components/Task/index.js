// third party
import React from 'react';
import axios from 'axios';
// pages
// components
import BigInput from "../../components/BigInput";
// styles


const date = (task) => {
    if (((task - new Date().getTime()) / 24 / 3600000).toFixed(2) <= 0) {
        return "expired"
    } else {
        return ((task - new Date().getTime()) / 24 / 3600000).toFixed(2)
    }
};


const ViewTask = ({ task }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `http://localhost:3005/done`,
            data: {
                taskId: task._id,
            }
        })
        .then(res => {
            console.log(res.data.note);
        })
        .catch(err => {
            console.log(err);
        });
    };



	return (
		<div className={task.done ? "taskContainer done" : "taskContainer not"}>
			<h3>{task.description}</h3>
            <h3>{date(task.duration)}</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <BigInput
					placeholder={task.done ? "undone" : "done"}
					type={"submit"}
				/>
            </form>
		</div>
	);
};

export default ViewTask;
