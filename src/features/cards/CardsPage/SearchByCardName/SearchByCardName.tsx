import React, {ChangeEvent, useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useDebounce} from '../../../../common/hooks/useDebounce';
import {cardActions} from '../../index';

const {setCardsSearchParams} = cardActions

type PropsType={
    setIsSearching: (isSearching: boolean)=>void
}

export const SearchByCardName = ({setIsSearching}:PropsType) => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)

    const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsSearching(true)
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setCardsSearchParams({cardQuestion: searchValue}))
    }, [debouncedValue])

    return (
        <>
            <h3>Search by question name</h3>
            <TextField placeholder="Provide your text"
                       size={'small'}
                       value={searchValue}
                       onChange={onSearchChange}
                       style={{marginBottom: '20px', width: '100%'}}
            />
        </>
    );
};
