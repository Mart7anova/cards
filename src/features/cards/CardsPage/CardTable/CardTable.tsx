import React from 'react';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { setCardsSearchParams } from '../../slice';
import { CardTableHead } from './CardTableHead/CardTableHead';
import { CardTableBody } from './CardTableBody/CardTableBody';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getCardsTotalCount, getPageCards, getPageCountCards } from '../../selectors';


type PropsType = {
  setIsSearching: (isSearching: boolean) => void
}

export const CardTable = ({ setIsSearching }: PropsType) => {
  const dispatch = useAppDispatch();

  const pageCards = useAppSelector(getPageCards);
  const cardsTotalCount = useAppSelector(getCardsTotalCount);
  const pageCountCards = useAppSelector(getPageCountCards);

  const pageChangeHandler = (event: unknown, page: number) => {
    dispatch(setCardsSearchParams({ page: page + 1 }));
  };
  const rowsPerPageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCardsSearchParams({ pageCount: Number(e.target.value) }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <CardTableHead />
        <CardTableBody setIsSearching={setIsSearching} />
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        rowsPerPage={pageCountCards}
        component='div'
        count={cardsTotalCount}
        page={pageCards - 1}
        onPageChange={pageChangeHandler}
        onRowsPerPageChange={rowsPerPageChangeHandler}
      />
    </TableContainer>
  );
};
