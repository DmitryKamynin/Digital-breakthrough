import { Backdrop, CircularProgress } from '@material-ui/core';
import React, {useContext} from 'react';

import AppRoutes from './routes';
import {GlobalContext} from './state/context/globalStateContext';

function App() {
  const { GlobalState } = useContext(GlobalContext);

  return (
    <>
      {GlobalState.ready && GlobalState.issues ?
          <AppRoutes /> 
          : 
          <Backdrop style={{color: '#fff', zIndex: '9999'}} open>
            <CircularProgress color="primary" />
          </Backdrop> 
       }
    </>
  );
}

export default App;

