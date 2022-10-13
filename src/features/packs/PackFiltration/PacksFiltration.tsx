import React from 'react';
import {Button, Tooltip} from '@mui/material';
import {packActions} from '../index';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {FilterByMyPacks} from './FilterByMyPacks/FilterByMyPacks';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {DoubleRangeFilter} from './DoubleRangeFilter/DoubleRangeFilter';
import s from './PacksFiltration.module.scss'
import {SearchByPackName} from './SearchByPackName/SearchByPackName';

const {clearSearchParams} = packActions

export const PacksFiltration = () => {
    const dispatch = useAppDispatch()

    const clearFiltersHandle = () => {
        dispatch(clearSearchParams())
    }

    return (
        <div className={s.filterContainer}>
            <div>
                <h3>Search by name</h3>
                <SearchByPackName/>
            </div>
            <div>
                <h3 className={s.showTitle}>Show pack cards</h3>
                <FilterByMyPacks/>
            </div>
            <div>
                <h3 className={s.numberTitle}>Number of cards</h3>
                <DoubleRangeFilter/>
            </div>
            <div>
                <Tooltip title="clean filter">
                    <Button variant={'contained'} onClick={clearFiltersHandle}>
                        <FilterAltOffIcon/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
