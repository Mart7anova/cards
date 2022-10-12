import * as React from 'react';
import {useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';
import style from './DoubleRangeFilter.module.scss'
import {InputForRangeFilter} from './InputForRangeFilter';
import {getMaxCardsCount, getMinCardsCount, getSearchParams} from '../../selectors';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {packActions} from '../../index';

const {setSearchParams} = packActions

export function DoubleRangeFilter() {
    const dispatch = useAppDispatch()

    const minCardsCount = useAppSelector(getMinCardsCount)
    const maxCardsCount = useAppSelector(getMaxCardsCount)
    const {min, max} = useAppSelector(getSearchParams)

    const [value, setValue] = useState<number[]>([minCardsCount, maxCardsCount])

    const debouncedValue = useDebounce<number[]>(value, 1000)

    const onChangeFirstRange = (newValue: number) => {
        setValue([newValue, value[1]])
    }

    const onChangeDoubleRange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onChangeSecondRange = (newValue: number) => {
        setValue([value[0], newValue])
    }

    useEffect(() => {
        dispatch(setSearchParams({min: value[0], max: value[1]}))
    }, [debouncedValue])

    useEffect(() => {
        if (min && max) {
            setValue([min, max])
        }
    }, [min, max])

    useEffect(()=>{
        if (maxCardsCount) {
            setValue([minCardsCount, maxCardsCount])
        }
    },[minCardsCount, maxCardsCount])


    return (
        <div className={style.mainContainer}>
            <InputForRangeFilter currentValue={value[0]} setCurrentValue={onChangeFirstRange}/>
            <Slider
                value={value}
                onChange={onChangeDoubleRange}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
            />
            <InputForRangeFilter currentValue={value[1]} setCurrentValue={onChangeSecondRange}/>
        </div>
    );
}
