import React, { ReactElement } from 'react';

import style from './UsersFilter.module.scss';

import {
  DoubleRangeFilter,
  RangeParamType,
} from 'common/components/DoubleRangeFilter/DoubleRangeFilter';
import { SearchByName } from 'common/components/SearchByName/SearchByName';
import { AppStatus } from 'common/enums/AppStatus';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectMaxPacksCount,
  selectMinPacksCount,
  selectUsers,
  selectUsersSearchParam,
  selectUsersStatus,
} from 'features/users/selectors';
import { setUsersSearchParams } from 'features/users/slice';

export const UsersFilter = (): ReactElement => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const userStatus = useAppSelector(selectUsersStatus);
  const minPacksCount = useAppSelector(selectMinPacksCount);
  const maxPacksCount = useAppSelector(selectMaxPacksCount);
  const { min, max } = useAppSelector(selectUsersSearchParam);

  const isUserLoading = userStatus === AppStatus.loading;
  const haveUsers = !!users.length;

  const setSearchByNameParam = (): ((searchParam: string) => void) => {
    return (searchParam: string) => {
      dispatch(setUsersSearchParams({ userName: searchParam }));
    };
  };

  const setRangeParam = (): (({ min, max }: RangeParamType) => void) => {
    return ({ min, max }: RangeParamType) => {
      dispatch(setUsersSearchParams({ min, max }));
    };
  };

  if (!haveUsers) {
    return <div />;
  }

  return (
    <div className={style.mainContainer}>
      <h1>Search parameters</h1>

      <div className={style.filtersContainer}>
        <SearchByName
          title="Search by name"
          setSearchParam={setSearchByNameParam()}
          disabled={isUserLoading}
          fullWidth
          className={style.searchFilter}
        />

        <DoubleRangeFilter
          title="Number of packs"
          setSearchParam={setRangeParam()}
          currentMinCount={minPacksCount}
          currentMaxCount={maxPacksCount}
          minCountParam={min}
          maxCountParam={max}
          disabled={isUserLoading}
          className={style.rangeFilter}
        />
      </div>
    </div>
  );
};
