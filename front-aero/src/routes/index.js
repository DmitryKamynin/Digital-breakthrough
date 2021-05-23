import React, { useEffect } from 'react';
import { Switch } from 'react-router';
// import {BrowserRouter as Router } from 'react-router-dom';

import routes from '../constants/routes'; 

import PublicRouter from './PublicRouter';

import Tasks from '../screens/Tasks'
import MapY from '../screens/Map'
import Units from '../screens/Units'
import Persons from '../screens/Persons'

const AppRoutes = () => {

    return (
  
            <Switch>
                <PublicRouter exact path={routes.getTasks()} component={Tasks} />
                <PublicRouter exact path={routes.getMap()} component={ MapY } />
                <PublicRouter exact path={routes.getUnits()} component={Persons} /> 
                <PublicRouter exact path={routes.getTechnique()} component={Units} />
            </Switch>
 
    )
}  

export default AppRoutes