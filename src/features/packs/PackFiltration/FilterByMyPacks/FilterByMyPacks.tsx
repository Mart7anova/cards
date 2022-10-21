import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {packActions} from '../../index';
import {getUserProfile} from '../../../profile/selectors';
import {getSearchParams} from '../../selectors';

const {setIsMyPacksFilter} = packActions

type PropsType = {
    clearFilterHandler: () => void
    disabled: boolean
}

export const FilterByMyPacks = ({clearFilterHandler, disabled}:PropsType) => {
    const dispatch = useAppDispatch()

    const {_id} = useAppSelector(getUserProfile)
    const {user_id} = useAppSelector(getSearchParams)
    const profileId = _id

    const onIsMyPacksFilterChange = () => {
        dispatch(setIsMyPacksFilter(profileId))
    }

    return (
        <ButtonGroup color="primary" size={'medium'} disabled={disabled}>
            <Button variant={user_id ? 'contained' : 'outlined'}
                    onClick={onIsMyPacksFilterChange}>
                <h4 style={{margin: '0 10px'}}>My</h4>
            </Button>
            <Button variant={!user_id ? 'contained' : 'outlined'}
                    onClick={clearFilterHandler}>
                <h4 style={{margin: '0 10px'}}>All</h4>
            </Button>
        </ButtonGroup>
    );
};
