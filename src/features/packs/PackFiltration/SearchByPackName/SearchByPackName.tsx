import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import { setPacksSearchParams } from '../../slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useDebounce } from 'common/hooks/useDebounce';

type PropsType = {
  disabled: boolean;
};

const DELAY = 500;

export const SearchByPackName = ({ disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce<string>(searchValue, DELAY);

  useEffect(() => {
    dispatch(setPacksSearchParams({ packName: searchValue }));
  }, [debouncedValue]);

  const searchValueChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <TextField
      placeholder="Provide your text"
      size="small"
      value={searchValue}
      onChange={searchValueChangeHandler}
      style={{ margin: '0' }}
      disabled={disabled}
    />
  );
};
