// third party
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// pages
// components
import Navbar from "../../components/Navbar";
import BigInput from "../../components/BigInput";
import Task from "../../components/Task";
import history from "../../history";
// styles
import "./style.css";

const Tasks = () => {
	// Connect on reducer
	const isLoged = useSelector((state) => state.isLoged);
	const userId = useSelector((state) => state.userId);
	const dispatch = useDispatch();
	// custom hooks
	const initialState = [];
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [listOfOnGoingTasks, setListOfOnGoingTasks] = useState(initialState);
	const [listOfDoneOrFaildTasks, setListOfDoneOrFaildTasks] =
		useState(initialState);
	const [error, setError] = useState("");
	// handleSubmit function on submit will send request on login or register
	const handleSubmit = (e) => {
		e.preventDefault();
		// hitting the add-task endpoint, passing description, duration and userId
		axios({
			method: "POST",
			url: `http://localhost:3005/add-task`,
			data: {
				description,
				duration,
				userId,
			},
		})
			.then((res) => {
				// if user is loged isLoged state is changed to true
				if (res.data.note === "created" || res.data.note === "loged") {
					dispatch({ type: "LOGIN" });
				} else {
					setError(res.data.note);
					setListOfOnGoingTasks(res.data.listOfOnGoingTasks);
					setListOfDoneOrFaildTasks(res.data.listOfDoneOrFaildTasks);
				}
			})
			.then(() => {
				reset();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	//changing states to default if the user loggout
	const logOut = () => {
		dispatch({ type: "LOGOUT", userId: "111111111111" });
		history.push("/");
	};

	const fetchTasks = () => {
		//e.preventDefault();
		// hitting the signin fetch-task, passing userId
		axios({
			method: "POST",
			url: `http://localhost:3005/fetch-tasks`,
			data: { userId },
		})
			.then((res) => {
				//updating states with new lists
				setListOfOnGoingTasks(
					(prev) => (prev = res.data.listOfOnGoingTasks)
				);
				setListOfDoneOrFaildTasks(
					(prev) => (prev = res.data.listOfDoneOrFaildTasks)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		// checking if user is loged
		if (!isLoged) {
			history.push("/");
		}
		//fetching the data on the mount of components
		fetchTasks();
		//bug
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoged, userId]);

	//function to render individuals tasks, by passing them to the new component and returning them in list
	const renderTask = (tasks) => {
		return tasks.map((task, index) => {
			return <Task key={index} task={task} refetch={fetchTasks} />;
		});
	};

	//function for reseting add-task form after submit
	const reset = () => {
		setDescription("");
		setDuration("");
	};

	return (
		<div>
			<button onClick={() => logOut()}>LOGOUT</button>
			<Navbar />
			<form
				className="alignment"
				id="input-task"
				onSubmit={(e) => handleSubmit(e)}
			>
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
			{/* rendering lists of tasks */}
			<div className="tasksContainer">
				<div className="alignment">
					<h2>On going tasks</h2>
					{renderTask(listOfOnGoingTasks)}
				</div>
				<div className="alignment">
					<h2>Done or faild tasks</h2>
					{renderTask(listOfDoneOrFaildTasks)}
				</div>
			</div>
		</div>
	);
};

export default Tasks;
