import * as React from 'react';
import {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import style from './DoubleRangeFilter.module.scss'

type PropsType = {
    currentValue: number
    setCurrentValue: (currentValue: number) => void
    disabled: boolean
}

export function InputForRangeFilter({currentValue, setCurrentValue, disabled}: PropsType) {
    const [value, setValue] = useState(currentValue)

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = Number(e.currentTarget.value)
        if (newValue < -1 || Object.is(newValue, NaN)) {
            setValue(newValue)
            setCurrentValue(value)
        }
    };

    useEffect(() => {
        setValue(currentValue)
    }, [currentValue])

    return (
        <TextField size={'small'}
                   className={style.input}
                   type={'tel'}
                   value={value || 0}
                   onChange={valueChangeHandler}
                   disabled={disabled}
        />
    );
}
