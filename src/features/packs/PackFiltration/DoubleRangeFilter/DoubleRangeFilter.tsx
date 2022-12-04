import * as React from 'react';
import {useEffect, useState} from 'react';
import Slider from '@mui/material/Slider';
import s from './DoubleRangeFilter.module.scss'
import {InputForRangeFilter} from './InputForRangeFilter';
import {getMaxCardsCount, getMinCardsCount, getSearchParams} from '../../selectors';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {setPacksSearchParams} from "../../packsSlice";


type PropsType={
    disabled: boolean
}

export function DoubleRangeFilter({disabled}:PropsType) {
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
        dispatch(setPacksSearchParams({min: value[0], max: value[1]}))
    }, [debouncedValue])

    useEffect(() => {
        if (min && max) {
            setValue([min, max])
        } else if (maxCardsCount){
            setValue([minCardsCount, maxCardsCount])
        }
    }, [min, max, minCardsCount, maxCardsCount])

    return (
        <div className={s.mainContainer}>
            <InputForRangeFilter currentValue={value[0]} setCurrentValue={onChangeFirstRange} disabled={disabled}/>
            <Slider
                value={value}
                onChange={onChangeDoubleRange}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
                disabled={disabled}
            />
            <InputForRangeFilter currentValue={value[1]} setCurrentValue={onChangeSecondRange} disabled={disabled}/>
        </div>
    );
}
