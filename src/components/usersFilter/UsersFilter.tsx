import React, { ReactElement } from 'react';

import { SearchByName, DoubleRangeFilter } from 'components/common';
import { RangeParamType } from 'components/common/doubleRangeFilter';
import style from 'components/usersFilter/UsersFilter.module.scss';
import { AppStatus } from 'enums';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectMaxPacksCount,
  selectMinPacksCount,
  selectUsers,
  selectUsersSearchParam,
  selectUsersStatus,
} from 'store/selectors';
import { setUsersSearchParams } from 'store/slices';

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
