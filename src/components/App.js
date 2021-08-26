// third party 
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// pages
import SignIn from '../screens/SignIn';
import Leaderboard from '../screens/Leaderboard';
import Tasks from '../screens/Tasks';
import NotFound from '../screens/NotFound';
// components
import history from '../history';
// styles
import "../styles/tasks.css" 
import "../styles/style.css" 


const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch> 
                    <Route path='/' exact component={SignIn} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                    <Route path='/tasks' exact component={Tasks} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            
        </div>
    )
}

export default App;