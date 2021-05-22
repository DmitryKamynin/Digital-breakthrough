import React from 'react';
import { TableRow, TableHead, TableCell, Checkbox, TableSortLabel } from "@material-ui/core";


  
export default function CustomTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
    
    return (
      <TableHead>
        <TableRow
          selected={numSelected === rowCount}
        >
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all' }}
            />
          </TableCell>
          {headCells.filter((item, i) => i).map((headCell) => (
            <TableCell
              key={headCell.id}
              align={'left'}
              padding={'none'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }