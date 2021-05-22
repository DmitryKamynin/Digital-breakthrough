import { Typography } from '@material-ui/core';
import React from 'react';

const TableToolbar = (props) => {
    const { numSelected, tableTitle } = props;
  
    return (
      <>
        {numSelected > 0 ? (
          <Typography style={{marginLeft: '20px'}} variant='h6' component="div">
            Выбрано: {numSelected}
          </Typography>
        ) : (
          <Typography style={{marginLeft: '20px'}} variant="h6" id="tableTitle" component="div">
              {tableTitle}
          </Typography>
        )}
  
  
      </>
    );
  };

export default TableToolbar;