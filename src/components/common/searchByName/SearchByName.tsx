import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import style from 'components/common/searchByName/SearchByName.module.scss';
import { useDebounce } from 'hooks';

type PropsType = {
  title: string;
  fullWidth?: boolean;
  setSearchParam: (searchParam: string) => void;
  disabled: boolean;
  className?: string | undefined;
};

const DELAY = 500;

export const SearchByName = ({
  title,
  fullWidth,
  setSearchParam,
  disabled,
  className,
}: PropsType): ReactElement => {
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce<string>(searchValue, DELAY);
  const classNameTextField = fullWidth ? style.fullWidth : '';

  useEffect(() => {
    setSearchParam(searchValue);
  }, [debouncedValue]);

  const valueSearchChangeHandler = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setSearchValue(e.currentTarget.value);
  };

  return (
    <div className={className}>
      <h3>{title}</h3>
      <TextField
        placeholder="Provide your text"
        size="small"
        value={searchValue}
        onChange={valueSearchChangeHandler}
        className={classNameTextField}
        disabled={disabled}
      />
    </div>
  );
};
