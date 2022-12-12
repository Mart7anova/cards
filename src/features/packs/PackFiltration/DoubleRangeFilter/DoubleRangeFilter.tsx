import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider';

import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPackSearchParams,
} from '../../selectors';
import { setPacksSearchParams } from '../../slice';

import style from './DoubleRangeFilter.module.scss';
import { InputForRangeFilter } from './InputForRangeFilter';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useDebounce } from 'common/hooks/useDebounce';

type PropsType = {
  disabled: boolean;
};

const DELAY = 1000;

export const DoubleRangeFilter = ({ disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const { min, max } = useAppSelector(selectPackSearchParams);

  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount]);

  const debouncedValue = useDebounce<number[]>(value, DELAY);

  useEffect(() => {
    dispatch(setPacksSearchParams({ min: value[0], max: value[1] }));
  }, [debouncedValue]);

  useEffect(() => {
    if (min && max) {
      setValue([min, max]);
    } else if (maxCardsCount) {
      setValue([minCardsCount, maxCardsCount]);
    }
  }, [min, max, minCardsCount, maxCardsCount]);

  const firstRangeChangeHandler = (newValue: number): void => {
    setValue([newValue, value[1]]);
  };

  const doubleRangeChangeHandler = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  const secondRangeChangeHandler = (newValue: number): void => {
    setValue([value[0], newValue]);
  };

  return (
    <div className={style.mainContainer}>
      <InputForRangeFilter
        currentValue={value[0]}
        setCurrentValue={firstRangeChangeHandler}
        disabled={disabled}
      />

      <Slider
        value={value}
        onChange={doubleRangeChangeHandler}
        valueLabelDisplay="auto"
        min={minCardsCount}
        max={maxCardsCount}
        disabled={disabled}
      />

      <InputForRangeFilter
        currentValue={value[1]}
        setCurrentValue={secondRangeChangeHandler}
        disabled={disabled}
      />
    </div>
  );
};
