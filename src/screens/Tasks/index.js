// third party
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// pages
// components
import Navbar from "../../components/Navbar";
import BigInput from "../../components/BigInput";
import ViewTask from "../../components/Task";
import history from "../../history";
// styles

const Tasks = () => {
	// Connect on reducer
	const isLoged = useSelector((state) => state.isLoged);
	const dispatch = useDispatch();
	// custom hooks
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [tasks, setTasks] = useState("");
	const [error, setError] = useState("");
	// handleSubmit function on submit will send request on login or register
	const handleSubmit = (e) => {
		e.preventDefault();
		// hitting the signin endpoint, passing username and password
		axios({
			method: "POST",
			url: `http://localhost:3005/add-task`,
			data: {
				description,
				duration,
			},
		})
			.then((res) => {
				// if user is loged isLoged state is changed to true and user is redirected to tasks screen
				if (res.data.note === "created" || res.data.note === "loged") {
					dispatch({ type: "LOGIN" });
				} else {
					setError(res.data.note);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};


	const fetchTasks = () => {
		//e.preventDefault();
		// hitting the signin endpoint, passing username and password
		axios({
			method: "POST",
			url: `http://localhost:3005/fetch-tasks`,
		})
			.then((res) => {
				setTasks((prev) => (prev = res.data.tasks));
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const logOut = () => {
		dispatch({ type: "LOGOUT" });
		history.push("/");
    };
    
    useEffect(() => {
        // checking if user is loged
        fetchTasks()
    }, [  ])
    

	return (
		<div>
			<button onClick={() => logOut()}>LOGOUT</button>
			<Navbar />
			<form onSubmit={(e) => handleSubmit(e)}>
				<BigInput
					onChange={setDescription}
					placeholder={"Description"}
					type={"text"}
					value={description}
				/>
				<BigInput
					onChange={setDuration}
					placeholder={"Duration"}
					type={"number"}
					value={duration}
				/>
				<BigInput
					onChange={setDuration}
					placeholder={"Add task"}
					type={"submit"}
				/>
			</form>
			<h3>{error}</h3>
            {tasks.map((task) => {
				//console.log(task.description);
				//console.log(task.duration);
				return (<ViewTask task={task} />)
			})}
		</div>
	);
};

export default Tasks;
