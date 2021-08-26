// third party 
import React from 'react';
// pages
// components
// styles


// Input for big froms like singIn
// placeholder is like normal placeholder
// type is like normal type
// onChange is callback function like onChange
// value is the same like value on normal input in most cases use the hook
const IsDone = (done) => {
    if (done) {
        return "taskContainer done"
    } else {
        return "taskContainer not"
    }
}


const ViewTask = ({ task }) => {

    return (
        <div className={IsDone(task.done)} >
            <h3>{task.description}</h3>
            <h3>{((task.duration - new Date().getTime()) / 24 / 3600000).toFixed(2)}</h3>
        </div>
    )
};

export default ViewTask;