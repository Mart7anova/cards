import React, { ReactElement } from 'react';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import {
  selectCardsTotalCount,
  selectPageCards,
  selectPageCountCards,
} from '../../selectors';
import { setCardsSearchParams } from '../../slice';

import { CardTableBody } from './CardTableBody/CardTableBody';
import { CardTableHead } from './CardTableHead/CardTableHead';

import { COUNT_PAGES } from 'common/constants/CountPages';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

export const CardTable = ({ setIsSearching }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const pageCards = useAppSelector(selectPageCards);
  const cardsTotalCount = useAppSelector(selectCardsTotalCount);
  const pageCountCards = useAppSelector(selectPageCountCards);

  const pageChangeHandler = (event: unknown, page: number): void => {
    dispatch(setCardsSearchParams({ page: page + 1 }));
  };
  const rowsPerPageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardsSearchParams({ pageCount: Number(e.target.value) }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <CardTableHead />
        <CardTableBody setIsSearching={setIsSearching} />
      </Table>

      <TablePagination
        rowsPerPageOptions={COUNT_PAGES}
        rowsPerPage={pageCountCards}
        component="div"
        count={cardsTotalCount}
        page={pageCards - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </TableContainer>
  );
};
