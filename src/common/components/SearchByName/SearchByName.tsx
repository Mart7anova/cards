import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import { useDebounce } from 'common/hooks/useDebounce';

type PropsType = {
  title: string;
  fullWidth?: boolean;
  setSearchParam: (searchParam: string) => void;
  disabled: boolean;
};

const DELAY = 500;

export const SearchByName = ({
  title,
  fullWidth,
  setSearchParam,
  disabled,
}: PropsType): ReactElement => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce<string>(searchValue, DELAY);

  useEffect(() => {
    setSearchParam(searchValue);
  }, [debouncedValue]);

  const valueSearchChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <>
      <h3>{title}</h3>
      <TextField
        placeholder="Provide your text"
        size="small"
        value={searchValue}
        onChange={valueSearchChangeHandler}
        style={fullWidth ? { marginBottom: '20px', width: '100%' } : {}}
        disabled={disabled}
      />
    </>
  );
};
