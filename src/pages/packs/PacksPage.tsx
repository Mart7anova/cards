import React, { ReactElement, useEffect, useRef } from 'react';

import { Container } from '@mui/material';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { EmptyTable } from 'components/common/emptyTable';
import { PacksFiltration } from 'components/packFiltration';
import { PacksTable } from 'components/packsTable';
import { PackTitle } from 'components/packTitle';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  selectCardPacks,
  selectPackSearchParams,
  selectPacksStatus,
} from 'store/selectors/packsSelectors';
import { changeStatusFirstLoading, setIsMyPacksFilter } from 'store/slices';
import { fetchPacks } from 'store/thunks';

const COUNT_SYMBOLS = 3;

export const PacksPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const cardPacks = useAppSelector(selectCardPacks);
  const packsStatus = useAppSelector(selectPacksStatus);
  const {
    page,
    pageCount,
    sortPacks,
    packName,
    max,
    min,
    user_id: userId,
  } = useAppSelector(selectPackSearchParams);

  const isPackLoading = packsStatus === 'loading';
  const havePacks = !!cardPacks.length;

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPacks());
    }
    isSearch.current = false;
  }, [page, pageCount, sortPacks, packName, max, min, userId]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        userId,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [userId]);

  useEffect(() => {
    dispatch(changeStatusFirstLoading());

    if (window.location.hash) {
      const params = qs.parse(window.location.hash.substring(COUNT_SYMBOLS));
      const packsForUserId = params.user_id;

      if (packsForUserId) {
        dispatch(setIsMyPacksFilter(packsForUserId as string));
        isSearch.current = true;
      }
    }
  }, []);

  return (
    <Container fixed>
      <PackTitle disabled={isPackLoading} />

      <PacksFiltration disabled={isPackLoading} />

      {havePacks ? <PacksTable /> : <EmptyTable isLoading={isPackLoading} />}
    </Container>
  );
};
