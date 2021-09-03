// third party
import React from 'react';
import axios from 'axios';
// pages
// components
import BigInput from "../../components/BigInput";
// styles

//function that calculate days to expiration of tasks by calculating it from ms
const date = (task) => {
    let days = ((task - new Date().getTime()) / 24 / 3600000).toFixed(2);
    if (days <= 0) {
        return "expired"
    } else {
        return (days)
    }
};


const ViewTask = ({ task, refetch }) => {
    //sending data(task id) on button submit and refetching the data from db
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
            refetch()
        })
        .catch(err => {
            console.log(err);
        });
    };



    return (
		<div className={task.done ? "taskContainer done" : "taskContainer not"}>{/* changing classes if the task is done */}
			<h3>{task.description}</h3>
            <h3>{date(task.duration)}</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <BigInput
                    placeholder={task.done ? "undone" : "done"}
                    value={task._id}
					type={"submit"}
				/>
            </form>
		</div>
	);
};

export default ViewTask;
