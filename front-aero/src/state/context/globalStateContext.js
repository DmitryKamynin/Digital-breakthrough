import React, { useReducer,useEffect, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';
import {GET_SUCCES, ERROR} from '../../constants';

import { useHttp } from '../../hooks/useHttp';

export const GlobalContext = createContext();

const GlobalStateContext = ({ children }) => {
    const { request } = useHttp();
    const [GlobalState, dispatch] = useReducer(globalStateReducer, {ready: false});

    useEffect(() => {
      Promise.all([
        request('http://185.185.69.68:8000/issues/?format=json'),
        request('http://185.185.69.68:8000/units/?format=json'),
        request('http://185.185.69.68:8000/persons/?format=json'),
      ])
      .then( values => { 
        if(values[0].error) dispatch( { type: ERROR } );
        dispatch( { type: GET_SUCCES, data:values  } )} );
    }, []);

    return (
        <GlobalContext.Provider
          value={{
            GlobalState,
            dispatch,
          }}
        >
          {children}
        </GlobalContext.Provider>
    );
}

export default GlobalStateContext;
