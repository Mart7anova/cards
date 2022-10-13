import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {packActions} from '../../index';

const {setSearchParams} = packActions

export const SearchByName = () => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearchParams({packName: searchValue}))
    }, [debouncedValue])

    return (
        <TextField placeholder="Provide your text"
                   size={'small'}
                   value={searchValue}
                   onChange={onSearchChange}
                   style={{margin: '0'}}
        />
    );
};

