import React, { useReducer, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';

export const GlobalContext = createContext();

const GlobalStateContext = ({ children }) => {
    const [GlobalState, dispatch] = useReducer(globalStateReducer, {})

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