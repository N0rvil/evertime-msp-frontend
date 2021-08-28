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
    const initialState = [];
	const [description, setDescription] = useState("");
	const [duration, setDuration] = useState("");
	const [listOfOnGoingTasks, setListOfOnGoingTasks] = useState(initialState);
	const [listOfDoneOrFaildTasks, setListOfDoneOrFaildTasks] = useState(initialState);
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
                    setListOfOnGoingTasks(res.data.listOfOnGoingTasks);
                    setListOfDoneOrFaildTasks(res.data.listOfDoneOrFaildTasks);
				}
			})
			.then(() => {
				reset()
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
				setListOfOnGoingTasks((prev) => (prev = res.data.listOfOnGoingTasks));
				setListOfDoneOrFaildTasks((prev) => (prev = res.data.listOfDoneOrFaildTasks));
			})
			.catch((err) => {
				console.log(err);
			});
	};

    const renderTask = (tasks) => {
        return tasks.map((task, index) => {
            //console.log(task.description);
            //console.log(task.duration);
            return (<ViewTask key={index} task={task} />)
        })
    }

	const logOut = () => {
		dispatch({ type: "LOGOUT" });
		history.push("/");
    };

    useEffect(() => {
        // checking if user is loged
        fetchTasks()
	}, [])
	
    
	const reset = () => {
		setDescription("")
		setDuration("")
	}
    
    

	return (
		<div >
			<button onClick={() => logOut()}>LOGOUT</button>
			<Navbar />
			<form className="alignment" id="input-task" onSubmit={(e) => handleSubmit(e)}>
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
