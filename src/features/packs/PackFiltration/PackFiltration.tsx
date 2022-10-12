import React, {ChangeEvent, useEffect, useState} from 'react';
import {IconButton, TextField, Tooltip} from '@mui/material';
import {packActions} from '../index';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {useDebounce} from '../../../common/hooks/useDebounce';
import {FilterByMyCards} from './FilterByMyCards/FilterByMyCards';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {DoubleRangeFilter} from './DoubleRangeFilter/DoubleRangeFilter';

const {fetchPacks, clearSearchParams, setSearchParams} = packActions

export const PackFiltration = () => {
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const clearFiltersHandle = () => {
        dispatch(clearSearchParams())
        dispatch(fetchPacks())
    }

    useEffect(() => {
        dispatch(setSearchParams({packName: searchValue}))
    }, [debouncedValue])

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <div>
                <h3>Search</h3>
                <TextField placeholder="Provide your text"
                           size={'small'}
                           value={searchValue}
                           onChange={onSearchChange}
                           style={{margin: '0'}}
                />
            </div>
            <div>
                <h3>Show pack cards</h3>
                <FilterByMyCards/>
            </div>
            <div>
                <div>number of cards</div>
                <DoubleRangeFilter/>
            </div>
            <div>
                <Tooltip title="clean filter">
                    <IconButton onClick={clearFiltersHandle}><FilterAltOffIcon/></IconButton>
                </Tooltip>
            </div>
        </div>
    )
}
