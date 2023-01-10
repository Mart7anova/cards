import React, { ReactElement, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { SearchByName, SkeletonTable } from 'components/common';
import { PacksTable } from 'components/packsTable';
import { AppStatus } from 'enums';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  selectCardPacks,
  selectPackSearchParams,
  selectPacksStatus,
} from 'store/selectors';
import { setPacksSearchParams } from 'store/slices';
import { fetchPacks } from 'store/thunks';

export const Pack = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { userId } = useParams() as { userId: string };

  const packsStatus = useAppSelector(selectPacksStatus);
  const packs = useAppSelector(selectCardPacks);
  const { packName, page, pageCount, sortPacks } = useAppSelector(selectPackSearchParams);

  const isUserProfileLoading = packsStatus === AppStatus.loading;
  const havePack = packs.length !== 0;

  const setSearchParam = (): ((searchParam: string) => void) => {
    return (searchParam: string) => {
      dispatch(setPacksSearchParams({ packName: searchParam }));
    };
  };

  useEffect(() => {
    dispatch(setPacksSearchParams({ user_id: userId }));
    dispatch(fetchPacks());
  }, [userId, packName, page, pageCount, sortPacks]);

  return havePack ? (
    <>
      <SearchByName
        title="Search by name"
        setSearchParam={setSearchParam()}
        disabled={isUserProfileLoading}
        fullWidth
      />
      <PacksTable />
    </>
  ) : (
    <SkeletonTable />
  );
};
