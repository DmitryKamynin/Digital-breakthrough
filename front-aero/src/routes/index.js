import React from 'react';
import { Switch } from 'react-router';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import routes from '../constants/routes'; 

import Main from '../screens/'

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path={routes.getMain()}
                    render={Main}
                />
            </Switch>
        </Router>
    )
}

export default AppRoutes