import { Container } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { PacksTable } from './PacksTable/PacksTable';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
    selectCardPacks,
    selectCardPacksTotalCount,
    selectPacksStatus,
    selectPageCountPacks,
    selectPagePacks,
    selectSearchParams,
} from './selectors';
import { PacksFiltration } from './PackFiltration/PacksFiltration';
import { useNavigate } from 'react-router-dom';
import { changeStatusFirstLoading, fetchPacks, setIsMyPacksFilter } from './slice';
import { PackTitle } from './PackTitle/PackTitle';
import { NoItems } from 'common/components/NoItems/NoItems';


export const Packs = () => {
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
    page, pageCount,
    sortPacks, packName,
    max, min, user_id,
  } = useAppSelector(selectSearchParams);

  const isPacksLoading = packsStatus === 'loading';
  const havePacks = !!cardPacks.length;

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPacks());
    }
    isSearch.current = false;
  }, [page, pageCount, sortPacks, packName, max, min, user_id]);

  //saving the url parameter when the page is reloaded
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        user_id,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [user_id]);

  useEffect(() => {
    dispatch(changeStatusFirstLoading());

    if (window.location.hash) {
      const params = qs.parse(window.location.hash.substring(3));
      const packsForUserId = params.user_id;

      if (packsForUserId) {
        dispatch(setIsMyPacksFilter(packsForUserId as string));
        isSearch.current = true;
      }
    }
  }, []);

  return (
    <Container fixed>
      <PackTitle disabled={isPacksLoading} />

      <PacksFiltration disabled={isPacksLoading} />

      {
        havePacks
          ? <PacksTable page={pagePacks}
                        rowsPerPage={pageCountPacks}
                        count={cardPacksTotalCount} />
          : <NoItems isLoading={isPacksLoading} />
      }
    </Container>
  );
};
