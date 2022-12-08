import * as React from 'react';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import style from './DoubleRangeFilter.module.scss';
import { InputForRangeFilter } from './InputForRangeFilter';
import { selectMaxCardsCount, selectMinCardsCount, selectSearchParams } from '../../selectors';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useDebounce } from 'common/hooks/useDebounce';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { setPacksSearchParams } from '../../slice';


type PropsType = {
  disabled: boolean
}

export function DoubleRangeFilter({ disabled }: PropsType) {
  const dispatch = useAppDispatch();

  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const { min, max } = useAppSelector(selectSearchParams);

  const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount]);
  const debouncedValue = useDebounce<number[]>(value, 1000);

  const firstRangeChangeHandler = (newValue: number) => {
    setValue([newValue, value[1]]);
  };

  const doubleRangeChangeHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const secondRangeChangeHandler = (newValue: number) => {
    setValue([value[0], newValue]);
  };

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

  return (
    <div className={style.mainContainer}>
      <InputForRangeFilter currentValue={value[0]}
                           setCurrentValue={firstRangeChangeHandler}
                           disabled={disabled}
      />

      <Slider
        value={value}
        onChange={doubleRangeChangeHandler}
        valueLabelDisplay='auto'
        min={minCardsCount}
        max={maxCardsCount}
        disabled={disabled}
      />

      <InputForRangeFilter currentValue={value[1]}
                           setCurrentValue={secondRangeChangeHandler}
                           disabled={disabled}
      />
    </div>
  );
}
