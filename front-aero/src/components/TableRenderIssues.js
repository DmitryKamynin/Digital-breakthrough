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
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState([]);

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
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = 10 - Math.min(10, rows.length - page * 10);
  
  const getTime = (row) => {
    const date = new Date(row.time_created);
    return `${date.getDay()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
  }


  return (
    <div>
      <Paper>
        <TableToolbar tableTitle={tableTitle} numSelected={selected.length} />
        <TableContainer>
          <Table
            size={'small'}
          >
            <CustomTableHead
              headCells={headCells}
              numSelected={selected.length}
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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.issue}
                      </TableCell>
                      <TableCell style={row.status === 'New' ? {backgroundColor:'#63a3db73'} : {backgroundColor:'#72dd4c69'}} align="left" padding="none">{row.status}</TableCell>
                      <TableCell align="left" padding="none">{row.person}</TableCell>
                      <TableCell align="left" padding="none">{row.unit}</TableCell>
                      <TableCell align="left" padding="none">{getTime(row)}</TableCell>
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
