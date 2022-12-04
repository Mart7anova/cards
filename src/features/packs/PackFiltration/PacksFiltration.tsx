import React from 'react';
import {Button, Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {FilterByMyPacks} from './FilterByMyPacks/FilterByMyPacks';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {DoubleRangeFilter} from './DoubleRangeFilter/DoubleRangeFilter';
import s from './PacksFiltration.module.scss'
import {SearchByPackName} from './SearchByPackName/SearchByPackName';
import {clearSearchParams} from "../packsSlice";


type PropsType={
    disabled: boolean
}

export const PacksFiltration = ({disabled}: PropsType) => {
    const dispatch = useAppDispatch()

    const clearFiltersHandle = () => {
        dispatch(clearSearchParams())
    }

    return (
        <div className={s.filterContainer}>
            <div>
                <h3>Search by name</h3>
                <SearchByPackName disabled={disabled}/>
            </div>
            <div>
                <h3 className={s.showTitle}>Show pack cards</h3>
                <FilterByMyPacks clearFilterHandler={clearFiltersHandle} disabled={disabled}/>
            </div>
            <div>
                <h3 className={s.numberTitle}>Number of cards</h3>
                <DoubleRangeFilter disabled={disabled}/>
            </div>
            <div>
                <Tooltip title="clean filter">
                    <Button variant={'contained'} onClick={clearFiltersHandle} disabled={disabled}>
                        <FilterAltOffIcon/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
