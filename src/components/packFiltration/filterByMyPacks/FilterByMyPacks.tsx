import React, { ReactElement } from 'react';

import { Button, ButtonGroup } from '@mui/material';

import style from 'components/packFiltration/filterByMyPacks/FilterByMyPacks.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectPackSearchParams, selectProfile } from 'store/selectors';
import { setIsMyPacksFilter } from 'store/slices';

type PropsType = {
  cleanFilters: () => void;
  disabled: boolean;
};

export const FilterByMyPacks = ({ cleanFilters, disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { _id: profileId } = useAppSelector(selectProfile);
  const { user_id: userId } = useAppSelector(selectPackSearchParams);

  const filterChangeHandler = (): void => {
    dispatch(setIsMyPacksFilter(profileId));
  };

  return (
    <ButtonGroup color="primary" size="medium" disabled={disabled}>
      <Button variant={userId ? 'contained' : 'outlined'} onClick={filterChangeHandler}>
        <h4 className={style.button}>My</h4>
      </Button>

      <Button variant={!userId ? 'contained' : 'outlined'} onClick={cleanFilters}>
        <h4 className={style.button}>All</h4>
      </Button>
    </ButtonGroup>
  );
};
