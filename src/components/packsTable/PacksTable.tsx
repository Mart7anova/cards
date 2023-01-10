import React, { ReactElement } from 'react';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { PacksTableBody } from 'components/packsTable/packTableBody';
import { PackTableHead } from 'components/packsTable/PackTableHead';
import { COUNT_PAGES } from 'constants/CountPages';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectPacksTotalCount,
  selectPacksPageCount,
  selectPacksPage,
} from 'store/selectors';
import { setPacksSearchParams } from 'store/slices/packsSlice';

export const PacksTable = (): ReactElement => {
  const dispatch = useAppDispatch();

  const packsPage = useAppSelector(selectPacksPage);
  const packsPageCount = useAppSelector(selectPacksPageCount);
  const packsTotalCount = useAppSelector(selectPacksTotalCount);

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
        <PacksTableBody />
      </Table>

      <TablePagination
        rowsPerPageOptions={COUNT_PAGES}
        rowsPerPage={packsPageCount}
        component="div"
        count={packsTotalCount}
        page={packsPage - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </TableContainer>
  );
};
