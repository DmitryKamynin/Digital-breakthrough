import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core';

import {stableSort, getComparator} from '../utils/Comparator.js';

import styles from '../styles/table.module.css';

import CustomTableHead from './CustomTableHead';
import TableToolbar from './TableToolbar';



export default function UnitsTable(props) {
  const { rows, tableTitle, headCells} = props; 

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
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

  return (
    <div>
      <Paper>
        <TableToolbar tableTitle={tableTitle} 
         selected={selected} 
         type='persons'
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
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell> */}
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.first_name}
                      </TableCell>
                      <TableCell align="left" padding="none">{row.last_name} </TableCell>
                      <TableCell align="left" padding="none">{row.post}</TableCell>
                      <TableCell align="left" padding="none">{row.id_telegram} </TableCell>
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
