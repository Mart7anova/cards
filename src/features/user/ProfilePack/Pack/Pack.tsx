import React, { ReactElement, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { SearchByName } from 'common/components/SearchByName/SearchByName';
import { SkeletonTable } from 'common/components/SkeletonTable/SkeletonTable';
import { AppStatus } from 'common/enums/AppStatus';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { PacksTable } from 'features/packs/PacksTable/PacksTable';
import {
  selectCardPacks,
  selectPackSearchParams,
  selectPacksStatus,
} from 'features/packs/selectors';
import { fetchPacks, setPacksSearchParams } from 'features/packs/slice';

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
