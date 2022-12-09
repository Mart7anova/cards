import * as React from 'react';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import style from './DoubleRangeFilter.module.scss';

type PropsType = {
  currentValue: number;
  setCurrentValue: (currentValue: number) => void;
  disabled: boolean;
};

export const InputForRangeFilter = ({
  currentValue,
  setCurrentValue,
  disabled,
}: PropsType): ReactElement => {
  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const valueChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newValue = Number(e.currentTarget.value);

    if (newValue < -1 || Object.is(newValue, NaN)) {
      setValue(newValue);
      setCurrentValue(value);
    }
  };

  return (
    <TextField
      size="small"
      className={style.input}
      type="tel"
      value={value || 0}
      onChange={valueChangeHandler}
      disabled={disabled}
    />
  );
};
