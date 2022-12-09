import React, { ReactElement } from 'react';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { setPacksSearchParams } from '../slice';

import { PackTableBody } from './PackTableBody/PackTableBody';
import { PackTableHead } from './PackTableHead/PackTableHead';

import { COUNT_PAGES } from 'common/constants/CountPages';
import { useAppDispatch } from 'common/hooks/useAppDispatch';

type PropsType = {
  rowsPerPage: number;
  page: number;
  count: number;
};

export const PacksTable = ({ page, rowsPerPage, count }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const pageChangeHandler = (event: unknown, page: number): void => {
    dispatch(setPacksSearchParams({ page: page + 1 }));
  };

  const rowsPerPageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setPacksSearchParams({ pageCount: Number(e.target.value) }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <PackTableHead />
        <PackTableBody />
      </Table>

      <TablePagination
        rowsPerPageOptions={COUNT_PAGES}
        rowsPerPage={rowsPerPage}
        component="div"
        count={count}
        page={page - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </TableContainer>
  );
};
