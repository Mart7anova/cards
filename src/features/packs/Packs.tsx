import {Button, Container} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import s from './Packs.module.scss'
import {PacksTable} from './PacksTable/PacksTable';
import {packActions} from './index';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {
    getCardPacks,
    getCardPacksTotalCount,
    getPacksStatus,
    getPageCountPacks,
    getPagePacks,
    getSearchParams
} from './selectors';
import {SkeletonTable} from '../../common/components/SkeletonTable/SkeletonTable';
import {useModal} from '../../common/hooks/useModal';
import {PackModal} from './PackModal/PackModal';
import {PacksFiltration} from './PackFiltration/PacksFiltration';
import {NoResult} from '../../common/components/NoResult/NoResult';
import {useNavigate} from 'react-router-dom';

const {fetchPacks, createNewPack, changeStatusFirstLoading, setIsMyPacksFilter} = packActions

export const Packs = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const cardPacks = useAppSelector(getCardPacks)
    const pagePacks = useAppSelector(getPagePacks)
    const pageCountPacks = useAppSelector(getPageCountPacks)
    const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount)
    const packStatus = useAppSelector(getPacksStatus)

    const {page, pageCount, sortPacks, packName, max, min, user_id, } = useAppSelector(getSearchParams)

    const {open, openModal, closeModal} = useModal();

    const addNewPackHandler = async (name: string, isPrivate: boolean, deckCover: string) => {
        await dispatch(createNewPack({name, isPrivate, deckCover}))
        await dispatch(fetchPacks())
        closeModal()
    }

    useEffect(() => {
        if (!isSearch.current) {
            dispatch(fetchPacks())
        }
        isSearch.current = false
    }, [page, pageCount, sortPacks, packName, max, min, user_id])

    //saving the url parameter when the page is reloaded
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                user_id
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [user_id])

    useEffect(() => {
        dispatch(changeStatusFirstLoading())

        if (window.location.hash) {
            const params = qs.parse(window.location.hash.substring(3))
            const packsForUserId = params.user_id

            if (packsForUserId) {
                dispatch(setIsMyPacksFilter(packsForUserId as string))
                isSearch.current = true
            }
        }
    }, [])

    return (
        <Container fixed>
            <div className={s.title}>
                <h1>Packs list</h1>
                <Button variant={'contained'} onClick={openModal}>
                    <h4>Add new pack</h4>
                </Button>
                <PackModal title={'Add new pack'} open={open} closeModal={closeModal} sentChanges={addNewPackHandler}/>
            </div>

            <PacksFiltration/>

            {
                cardPacks.length ? <PacksTable page={pagePacks}
                                               rowsPerPage={pageCountPacks}
                                               count={cardPacksTotalCount}
                                               packs={cardPacks}/>
                    : packStatus ==='loading' ? <SkeletonTable/> : <NoResult/>
            }

        </Container>
    );
};
