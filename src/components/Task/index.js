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

const ViewTask = ({ task, index }) => {

    return (
        <dvi>
            <h3>{task.description}</h3>
            <h3>{task.duration}</h3>
        </dvi>
    )
};

export default ViewTask;