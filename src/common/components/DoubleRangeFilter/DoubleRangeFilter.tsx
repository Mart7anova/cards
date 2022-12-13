import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import Slider from '@mui/material/Slider';

import style from 'common/components/DoubleRangeFilter/DoubleRangeFilter.module.scss';
import { useDebounce } from 'common/hooks/useDebounce';

export type RangeParamType = { min: number; max: number };

type PropsType = {
  title: string;
  setSearchParam: ({ min, max }: RangeParamType) => void;
  currentMinCount: number;
  currentMaxCount: number;
  minCountParam: number | undefined;
  maxCountParam: number | undefined;
  disabled: boolean;
};

const DELAY = 1000;

export const DoubleRangeFilter = ({
  title,
  disabled,
  setSearchParam,
  currentMinCount,
  currentMaxCount,
  minCountParam,
  maxCountParam,
}: PropsType): ReactElement => {
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

  return (
    <div className={style.mainContainer}>
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
