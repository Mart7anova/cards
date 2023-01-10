import React, { ReactElement } from 'react';

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

const LENGTH_ARRAY = 5;

const NUMBERS_ARRAY: number[] = [];

for (let index = 0; index < LENGTH_ARRAY; index += 1) {
  NUMBERS_ARRAY.push(index);
}

export const SkeletonTable = (): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton animation="pulse" height={42} />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {NUMBERS_ARRAY.map(number => (
            <TableRow key={number}>
              <TableCell>
                <Skeleton animation="pulse" height={31} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
