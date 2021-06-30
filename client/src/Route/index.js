import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import Login from '../Component/Login';
import User from '../Component/User';
function index(props) {
    return (
        <Router>
            <Switch>
                <Route path="/"  exact render={()=> "Hello"}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/user" component={User}></Route>
            </Switch>
        </Router>
    );
}

export default index;