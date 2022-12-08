import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

export const SkeletonTable = () => {
  const fakeArray = [];

  for (let i = 0; i < 5; i++) {
    fakeArray.push(i);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton animation='pulse' height={42} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {fakeArray.map(number =>
            <TableRow key={number}>
              <TableCell>
                <Skeleton animation='pulse' height={31} />
              </TableCell>
            </TableRow>,
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
