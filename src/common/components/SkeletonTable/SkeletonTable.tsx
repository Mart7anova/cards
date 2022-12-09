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

export const SkeletonTable = (): ReactElement => {
  const fakeArray = [];

  for (let index = 0; index < LENGTH_ARRAY; index += 1) {
    fakeArray.push(index);
  }

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
          {fakeArray.map(number => (
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
