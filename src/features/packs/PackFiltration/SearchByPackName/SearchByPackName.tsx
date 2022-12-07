import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {setPacksSearchParams} from "../../slice";


type PropsType = {
    disabled: boolean
}

export const SearchByPackName = ({disabled}: PropsType) => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)

    const searchValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setPacksSearchParams({packName: searchValue}))
    }, [debouncedValue])

    return (
        <TextField placeholder="Provide your text"
                   size={'small'}
                   value={searchValue}
                   onChange={searchValueChangeHandler}
                   style={{margin: '0'}}
                   disabled={disabled}
        />
    );
};

