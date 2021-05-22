import React, { useReducer, createContext } from 'react';
import { globalStateReducer } from '../reducers/globalStateReducer';

export const AuthContext = createContext();

const GlobalStateContext = ({ children }) => {
    const [authState, dispatch] = useReducer(globalStateReducer, {})

    return (
        <AuthContext.Provider
          value={{
            authState,
            dispatch,
          }}
        >
          {children}
        </AuthContext.Provider>
    );
}

export default GlobalStateContext;