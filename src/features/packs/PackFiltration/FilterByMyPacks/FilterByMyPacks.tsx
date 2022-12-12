import React, { ReactElement } from 'react';

import { Button, ButtonGroup } from '@mui/material';

import { selectUserProfile } from '../../../profile/selectors';
import { selectPackSearchParams } from '../../selectors';
import { setIsMyPacksFilter } from '../../slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';

type PropsType = {
  cleanFilters: () => void;
  disabled: boolean;
};

export const FilterByMyPacks = ({ cleanFilters, disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { _id: profileId } = useAppSelector(selectUserProfile);
  const { user_id: userId } = useAppSelector(selectPackSearchParams);

  const textStyle = { margin: '0 10px' };

  const filterChangeHandler = (): void => {
    dispatch(setIsMyPacksFilter(profileId));
  };

  return (
    <ButtonGroup color="primary" size="medium" disabled={disabled}>
      <Button variant={userId ? 'contained' : 'outlined'} onClick={filterChangeHandler}>
        <h4 style={textStyle}>My</h4>
      </Button>

      <Button variant={!userId ? 'contained' : 'outlined'} onClick={cleanFilters}>
        <h4 style={textStyle}>All</h4>
      </Button>
    </ButtonGroup>
  );
};
