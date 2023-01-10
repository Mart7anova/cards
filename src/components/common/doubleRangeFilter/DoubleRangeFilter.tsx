import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider';

import { DoubleRangeFilterType } from './types';

import style from 'components/common/doubleRangeFilter/DoubleRangeFilter.module.scss';
import { useDebounce } from 'hooks';

const DELAY = 1000;

export const DoubleRangeFilter = ({
  title,
  disabled,
  setSearchParam,
  currentMinCount,
  currentMaxCount,
  minCountParam,
  maxCountParam,
  className,
}: DoubleRangeFilterType): ReactElement => {
  const [value, setValue] = useState<number[]>([currentMinCount, currentMaxCount]);

  const debouncedValue = useDebounce<number[]>(value, DELAY);

  useEffect(() => {
    setSearchParam({ min: value[0], max: value[1] });
  }, [debouncedValue]);

  useEffect(() => {
    if (minCountParam && maxCountParam) {
      setValue([minCountParam, maxCountParam]);
    }
  }, [minCountParam, maxCountParam]);

  useEffect(() => {
    setValue([currentMinCount, currentMaxCount]);
  }, [currentMinCount, currentMaxCount]);

  const doubleRangeChangeHandler = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  const mainClassName = `${style.mainContainer} ${className}`;

  return (
    <div className={mainClassName}>
      <h3 className={style.title}>{title}</h3>

      <div className={style.sliderContainer}>
        <div className={style.valueContainer}>
          <p className={style.value}>{value[0]}</p>
        </div>

        <Slider
          value={value}
          onChange={doubleRangeChangeHandler}
          valueLabelDisplay="auto"
          min={0}
          max={currentMaxCount}
          disabled={disabled}
          sx={{ width: '150px' }}
        />

        <div className={style.valueContainer}>
          <p className={style.value}>{value[1]}</p>
        </div>
      </div>
    </div>
  );
};
