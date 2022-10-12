import {Button, Container} from '@mui/material';
import React, {useEffect} from 'react';
import s from './Packs.module.scss'
import {PacksTable} from './PacksTable/PacksTable';
import {packActions} from './index';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getCardPacks, getCardPacksTotalCount, getPageCountPacks, getPagePacks, getSearchParams} from './selectors';
import {SkeletonTable} from '../../common/components/SkeletonTable/SkeletonTable';
import {useModal} from '../../common/hooks/useModal';
import {PackModal} from './PackModal/PackModal';
import {PackFiltration} from './PackFiltration/PackFiltration';

const {fetchPacks, createNewPack} = packActions

export type HeadersType = {
    name: string
    sortName: string
}

export const Packs = () => {
    const dispatch = useAppDispatch()

    const cardPacks = useAppSelector(getCardPacks)
    const pagePacks = useAppSelector(getPagePacks)
    const pageCountPacks = useAppSelector(getPageCountPacks)
    const cardPacksTotalCount = useAppSelector(getCardPacksTotalCount)

    const {page, pageCount, sortPacks, packName, max, min, user_id, } = useAppSelector(getSearchParams)

    const {open, openModal, closeModal} = useModal();

    const addNewPackHandler = async (name: string, isPrivate: boolean) => {
        await dispatch(createNewPack({name, isPrivate}))
        await dispatch(fetchPacks())
        closeModal()
    }

    useEffect(() => {
        dispatch(fetchPacks())
    }, [page, pageCount, sortPacks, packName, max, min, user_id])

    return (
        <Container fixed>
            <div className={s.title}>
                <h1>Packs list</h1>
                <Button variant={'contained'} onClick={openModal}>Add new pack</Button>
                <PackModal title={'Add new pack'} open={open} closeModal={closeModal} sentChanges={addNewPackHandler}/>
            </div>
            <PackFiltration/>
            {
                cardPacks.length ? <PacksTable page={pagePacks}
                                               rowsPerPage={pageCountPacks}
                                               count={cardPacksTotalCount}
                                               packs={cardPacks}/>
                    : <SkeletonTable/>
            }

        </Container>
    );
};
