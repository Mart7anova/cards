import React, {useEffect} from 'react';
import {Button, Container} from '@mui/material';
import {useModal} from '../../common/hooks/useModal';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {
    getCards,
    getCardsTotalCount,
    getPackName,
    getPackUserId,
    getPageCards, getPageCountCards,
    getSearchParamsCards
} from './selectors';
import {getProfile} from '../profile/selectors';
import {CardModal} from './CardModal/CardModal';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {cardActions} from './index';
import {useParams} from 'react-router-dom';
import s from './Cards.module.scss'
import {CardMenu} from './CardMenu/CardMenu';
import {CardsTable} from './CardsTable/CardsTable';

const {fetchCards, createCard} = cardActions

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }

    const cards = useAppSelector(getCards)
    const pageCards = useAppSelector(getPageCards)
    const pageCountCards = useAppSelector(getPageCountCards)
    const cardsTotalCount = useAppSelector(getCardsTotalCount)
    const {sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max} = useAppSelector(getSearchParamsCards)
    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId)
    const {_id} = useAppSelector(getProfile)

    const isOwner = packUserId === _id

    const {open, openModal, closeModal} = useModal();

    const addNewCard = async (question: string, answer: string) => {
        await dispatch(createCard({packId, question, answer}))
        await dispatch(fetchCards({packId}))
        closeModal()
    }

    useEffect(() => {
        dispatch(fetchCards({packId}))
    }, [sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max])


    return (
        <Container fixed>
            <div className={s.titleContainer}>
                <h1 className={s.titleName}>
                    {packName}
                    <CardMenu packId={packId} packName={packName}/>
                </h1>

                <div className={s.btnContainer}>
                    <Button variant={'contained'} color={'success'} onClick={openModal} className={s.btn}>
                        Learn cards
                    </Button>
                    {
                        isOwner && <>
                            <Button variant={'contained'} onClick={openModal}>
                                Add new card
                            </Button>
                            <CardModal title={'Add new card'} sentChanges={addNewCard} open={open} closeModal={closeModal}/>
                        </>
                    }
                </div>
            </div>

            <CardsTable cards={cards}
                        isOwner={isOwner}
                        page={pageCards}
                        count={cardsTotalCount}
                        rowsPerPage={pageCountCards}
            />

        </Container>
    );
};