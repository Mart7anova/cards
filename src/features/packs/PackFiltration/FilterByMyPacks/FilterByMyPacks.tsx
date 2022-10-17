import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import {useAppDispatch} from '../../../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';
import {packActions} from '../../index';
import {getProfile} from '../../../profile/selectors';
import {getPacksStatus, getSearchParams} from '../../selectors';

const {setIsMyPacksFilter} = packActions

type PropsType = {
    clearFilterHandler: () => void
}

export const FilterByMyPacks = ({clearFilterHandler}:PropsType) => {
    const dispatch = useAppDispatch()

    const {_id} = useAppSelector(getProfile)
    const {user_id} = useAppSelector(getSearchParams)
    const packsStatus = useAppSelector(getPacksStatus)

    const profileId = _id

    const onIsMyPacksFilterChange = (profileId: string) => {
        dispatch(setIsMyPacksFilter(profileId))
    }

    return (
        <ButtonGroup color="primary" size={'medium'} disabled={packsStatus === 'loading'}>
            <Button variant={user_id ? 'contained' : 'outlined'}
                    onClick={() => onIsMyPacksFilterChange(profileId)}>
                <h4 style={{margin: '0 10px'}}>My</h4>
            </Button>
            <Button variant={!user_id ? 'contained' : 'outlined'}
                    onClick={clearFilterHandler}>
                <h4 style={{margin: '0 10px'}}>All</h4>
            </Button>
        </ButtonGroup>
    );
};
