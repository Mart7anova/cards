import React from 'react';
import {Button, Tooltip} from '@mui/material';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {FilterByMyPacks} from './FilterByMyPacks/FilterByMyPacks';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {DoubleRangeFilter} from './DoubleRangeFilter/DoubleRangeFilter';
import style from './PacksFiltration.module.scss'
import {SearchByPackName} from './SearchByPackName/SearchByPackName';
import {clearSearchParams} from "../slice";


type PropsType = {
    disabled: boolean
}

export const PacksFiltration = ({disabled}: PropsType) => {
    const dispatch = useAppDispatch()

    const filtersCleanHandler = () => {
        dispatch(clearSearchParams())
    }

    return (
        <div className={style.filterContainer}>
            <div>
                <h3>Search by name</h3>
                <SearchByPackName disabled={disabled}/>
            </div>

            <div>
                <h3 className={style.showTitle}>Show pack cards</h3>
                <FilterByMyPacks cleanFilters={filtersCleanHandler} disabled={disabled}/>
            </div>

            <div>
                <h3 className={style.numberTitle}>Number of cards</h3>
                <DoubleRangeFilter disabled={disabled}/>
            </div>
            
            <div>
                <Tooltip title="clean filter">
                    <Button variant={'contained'} onClick={filtersCleanHandler} disabled={disabled}>
                        <FilterAltOffIcon/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
