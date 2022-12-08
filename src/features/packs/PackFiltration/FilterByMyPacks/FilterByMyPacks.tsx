import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getUserProfile } from '../../../profile/selectors';
import { getSearchParams } from '../../selectors';
import { setIsMyPacksFilter } from '../../slice';


type PropsType = {
  cleanFilters: () => void
  disabled: boolean
}

export const FilterByMyPacks = ({ cleanFilters, disabled }: PropsType) => {
  const dispatch = useAppDispatch();

  const { _id } = useAppSelector(getUserProfile);
  const { user_id } = useAppSelector(getSearchParams);
  const profileId = _id;
  const textStyle = { margin: '0 10px' };

  const filterChangeHandler = () => {
    dispatch(setIsMyPacksFilter(profileId));
  };

  return (
    <ButtonGroup color='primary' size={'medium'} disabled={disabled}>
      <Button variant={user_id ? 'contained' : 'outlined'}
              onClick={filterChangeHandler}>
        <h4 style={textStyle}>My</h4>
      </Button>

      <Button variant={!user_id ? 'contained' : 'outlined'}
              onClick={cleanFilters}>
        <h4 style={textStyle}>All</h4>
      </Button>
    </ButtonGroup>
  );
};
