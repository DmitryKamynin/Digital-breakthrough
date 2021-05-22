import { Backdrop, CircularProgress } from '@material-ui/core';
import React, {useContext} from 'react';

import AppRoutes from './routes';
import {GlobalContext} from './state/context/globalStateContext';

function App() {
  const { GlobalState } = useContext(GlobalContext);
  return (
    <>
      {GlobalState.ready ?
          <AppRoutes /> 
          : 
          <Backdrop>
            <CircularProgress color="inherit" />
          </Backdrop>
       }
    </>
  );
}

export default App;

