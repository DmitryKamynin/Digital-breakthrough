import React, {useState, useContext} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';

import {OPEN_COMMENTS} from '../constants';

import InfoIcon from '@material-ui/icons/Info';

import Timer from './Timer';

import {GlobalContext} from '../state/context/globalStateContext';

import {stableSort, getComparator} from '../utils/Comparator.js';

import styles from '../styles/table.module.css';

import CustomTableHead from './CustomTableHead';
import TableToolbar from './TableToolbar';

export default function UnitsTable(props) {
  const { dispatch } = useContext(GlobalContext);

  const { rows, tableTitle, headCells} = props; 

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState();

  const [page, setPage] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    if(name === selected) setSelected();
    else setSelected(name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = 10 - Math.min(10, rows.length - page * 10);
  
  const getTime = (row) => {
    const date = new Date(row.time_created);
    let hour = date.getHours();
    if(hour < 10) hour = '0' + date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10) minutes = '0' + date.getMinutes();
    return `${hour}:${minutes}`
  }

  return (
    <div>
      <Paper>
        <TableToolbar tableTitle={tableTitle} 
         selected={selected} 
         type='issues'
        />
        <TableContainer>
          <Table
            size={'small'}
          >
            <CustomTableHead
              headCells={headCells}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * 10, page * 10 + 10)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      style={{cursor:'pointer'}}
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={-1}
                      key={row.id}
                      selected={row.id === selected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={row.id === selected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.issue}
                      </TableCell>
                      <TableCell style={row.status === 'New' ? {backgroundColor:'#63a3db73'} : {backgroundColor:'#72dd4c69'}} align="left" padding="none">{row.status}</TableCell>
                      <TableCell align="left" padding="none">{row.person}</TableCell>
                      <TableCell align="left" padding="none">Y:{row.lat} X:{row.long}</TableCell>
                      <TableCell align="left" padding="none">{row.unit}</TableCell>
                      <TableCell align="left" padding="none">{getTime(row)}</TableCell>
                      <TableCell align="left" padding="none"><Timer row={row}/></TableCell>
                      <TableCell align="left" style={{maxHeight: '21px'}} padding="none">
                        <IconButton
                          classes={{root: styles.infoIcon}}
                          onClick={e => {
                            e.stopPropagation();
                            dispatch({ type: OPEN_COMMENTS })
                          }}>
                          <InfoIcon/>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: ( 25 ) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={0}
          component="div"
          count={rows.length}
          rowsPerPage={10}
          page={page}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
}
