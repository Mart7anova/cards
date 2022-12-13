import React, { ReactElement } from 'react';

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Button, Tooltip } from '@mui/material';

import { clearSearchParams, setPacksSearchParams } from '../slice';

import { FilterByMyPacks } from './FilterByMyPacks/FilterByMyPacks';
import style from './PacksFiltration.module.scss';

import {
  DoubleRangeFilter,
  RangeParamType,
} from 'common/components/DoubleRangeFilter/DoubleRangeFilter';
import { SearchByName } from 'common/components/SearchByName/SearchByName';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectMaxCardsCount,
  selectMinCardsCount,
  selectPackSearchParams,
} from 'features/packs/selectors';

type PropsType = {
  disabled: boolean;
};

export const PacksFiltration = ({ disabled }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const minCardsCount = useAppSelector(selectMinCardsCount);
  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const { min, max } = useAppSelector(selectPackSearchParams);

  const filtersCleanHandler = (): void => {
    dispatch(clearSearchParams());
  };

  const setSearchByNameParam = (): ((searchParam: string) => void) => {
    return (searchParam: string) => {
      dispatch(setPacksSearchParams({ packName: searchParam }));
    };
  };

  const setRangeParam = (): (({ min, max }: RangeParamType) => void) => {
    return ({ min, max }: RangeParamType) => {
      dispatch(setPacksSearchParams({ min, max }));
    };
  };

  return (
    <div className={style.filterContainer}>
      <div>
        <SearchByName
          title="Search by name"
          setSearchParam={setSearchByNameParam()}
          disabled={disabled}
        />
      </div>

      <div>
        <h3 className={style.showTitle}>Show pack cards</h3>
        <FilterByMyPacks cleanFilters={filtersCleanHandler} disabled={disabled} />
      </div>

      <div>
        <DoubleRangeFilter
          title="Number of cards"
          currentMinCount={minCardsCount}
          currentMaxCount={maxCardsCount}
          minCountParam={min}
          maxCountParam={max}
          setSearchParam={setRangeParam()}
          disabled={disabled}
        />
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
