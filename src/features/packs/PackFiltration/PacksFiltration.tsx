import React, { ReactElement } from 'react';

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Button, Tooltip } from '@mui/material';

import { clearSearchParams } from '../slice';

import { DoubleRangeFilter } from './DoubleRangeFilter/DoubleRangeFilter';
import { FilterByMyPacks } from './FilterByMyPacks/FilterByMyPacks';
import style from './PacksFiltration.module.scss';
import { SearchByPackName } from './SearchByPackName/SearchByPackName';

import { useAppDispatch } from 'common/hooks/useAppDispatch';

type PropsType = {
  disabled: boolean;
};

export const PacksFiltration = ({ disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const filtersCleanHandler = (): void => {
    dispatch(clearSearchParams());
  };

  return (
    <div className={style.filterContainer}>
      <div>
        <h3>Search by name</h3>
        <SearchByPackName disabled={disabled} />
      </div>

      <div>
        <h3 className={style.showTitle}>Show pack cards</h3>
        <FilterByMyPacks cleanFilters={filtersCleanHandler} disabled={disabled} />
      </div>

      <div>
        <h3 className={style.numberTitle}>Number of cards</h3>
        <DoubleRangeFilter disabled={disabled} />
      </div>

      <div>
        <Tooltip title="clean filter">
          <Button variant="contained" onClick={filtersCleanHandler} disabled={disabled}>
            <FilterAltOffIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
