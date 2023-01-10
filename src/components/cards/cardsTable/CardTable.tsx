import React, { ReactElement } from 'react';

import { Paper, Table, TableContainer, TablePagination } from '@mui/material';

import { CardTableBody } from 'components/cards/cardsTable/cardTableBody';
import { CardTableHead } from 'components/cards/cardsTable/cardTableHead';
import { COUNT_PAGES } from 'constants/CountPages';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCardsTotalCount,
  selectPageCards,
  selectPageCountCards,
} from 'store/selectors/cardsSelectors';
import { setCardsSearchParams } from 'store/slices';

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
