import React, { ReactElement } from 'react';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { setPacksSearchParams } from '../slice';

import { PackTableBody } from './PackTableBody/PackTableBody';
import { PackTableHead } from './PackTableHead/PackTableHead';

import { COUNT_PAGES } from 'common/constants/CountPages';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectPacksTotalCount,
  selectPacksPageCount,
  selectPacksPage,
} from 'features/packs/selectors';

export const PacksTable = (): ReactElement => {
  const dispatch = useAppDispatch();

  const pagePacks = useAppSelector(selectPacksPage);
  const pageCountPacks = useAppSelector(selectPacksPageCount);
  const cardPacksTotalCount = useAppSelector(selectPacksTotalCount);

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
        rowsPerPage={pageCountPacks}
        component="div"
        count={cardPacksTotalCount}
        page={pagePacks - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </TableContainer>
  );
};
