import { Typography, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import React, {useContext} from 'react';

import {GlobalContext} from '../state/context/globalStateContext';
import {OPEN_CHANGE_FORM , OPEN_CREATE_FORM } from '../constants'
import { useHttp } from '../hooks/useHttp';

const TableToolbar = (props) => {

    const { request } = useHttp();
    const { selected, tableTitle, type } = props;
    const { dispatch } = useContext(GlobalContext);


    const handleDelete = () => {
      if(type === 'issues'){
        request(`http://185.185.69.68:8000/issues/${selected}?format=json`, 'DELETE');
        dispatch( { type:'DELETE', id:selected } )
      }
      if(type === 'persons'){
        request(`http://185.185.69.68:8000/persons/${selected}?format=json`, 'DELETE');
        dispatch( { type:'DELETE_PERSONS', id:selected } )
      }
      if(type === 'units'){
        request(`http://185.185.69.68:8000/units/${selected}?format=json`, 'DELETE');
        dispatch( { type:'DELETE_UNITS', id:selected } )
      }
    }

  
    return (
      <Toolbar>
        
        <Typography style={{marginLeft: '20px', flex: '1 1 100%'}} variant="h6" id="tableTitle" component="div">
            {tableTitle}
        </Typography>

        <Tooltip title="Создать">
          <IconButton onClick={ () => dispatch({ type: OPEN_CREATE_FORM }) }>
            <AddIcon />
          </IconButton>
        </Tooltip>

        {selected &&
         <>
           <Tooltip title="Удалить">
              <IconButton>
                <DeleteIcon onClick={() => {handleDelete()}}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Изменить">
              <IconButton onClick={ () => dispatch({ type: OPEN_CHANGE_FORM, id: selected }) }>
                <CreateIcon />
              </IconButton>
            </Tooltip>
         </>}
  
      </Toolbar>
    );
  };

export default TableToolbar;