import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import { setCardsSearchParams } from '../../slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useDebounce } from 'common/hooks/useDebounce';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

const DELAY = 500;

export const SearchByCardName = ({ setIsSearching }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce<string>(searchValue, DELAY);

  useEffect(() => {
    dispatch(setCardsSearchParams({ cardQuestion: searchValue }));
  }, [debouncedValue]);

  const valueSearchChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setIsSearching(true);
    setSearchValue(e.currentTarget.value);
  };

  return (
    <>
      <h3>Search by question name</h3>

      <TextField
        placeholder="Provide your text"
        size="small"
        value={searchValue}
        onChange={valueSearchChangeHandler}
        style={{ marginBottom: '20px', width: '100%' }}
      />
    </>
  );
};
