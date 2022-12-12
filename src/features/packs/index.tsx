import React, { ReactElement, useEffect, useRef } from 'react';

import { Container } from '@mui/material';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { PacksFiltration } from './PackFiltration/PacksFiltration';
import { PacksTable } from './PacksTable/PacksTable';
import { PackTitle } from './PackTitle/PackTitle';
import {
  selectCardPacks,
  selectCardPacksTotalCount,
  selectPacksStatus,
  selectPageCountPacks,
  selectPagePacks,
  selectPackSearchParams,
} from './selectors';
import { changeStatusFirstLoading, fetchPacks, setIsMyPacksFilter } from './slice';

import { NoItems } from 'common/components/NoItems/NoItems';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';

const COUNT_SYMBOLS = 3;

export const Packs = (): ReactElement => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const cardPacks = useAppSelector(selectCardPacks);
  const pagePacks = useAppSelector(selectPagePacks);
  const pageCountPacks = useAppSelector(selectPageCountPacks);
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
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

  const IS_PACKS_LOADING = packsStatus === 'loading';
  const HAVE_PACKS = !!cardPacks.length;

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
      <PackTitle disabled={IS_PACKS_LOADING} />

      <PacksFiltration disabled={IS_PACKS_LOADING} />

      {HAVE_PACKS ? (
        <PacksTable
          page={pagePacks}
          rowsPerPage={pageCountPacks}
          count={cardPacksTotalCount}
        />
      ) : (
        <NoItems isLoading={IS_PACKS_LOADING} />
      )}
    </Container>
  );
};
