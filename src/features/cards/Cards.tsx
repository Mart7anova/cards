import React, {useEffect} from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getCardsTotalCount, getSearchParamsCards} from './selectors';
import {CardsPage} from './CardsPage/CardsPage';
import {EmptyCardsPage} from './EmptyCardsPage/EmptyCardsPage';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {cardActions} from './index';
import {useParams} from 'react-router-dom';

const {fetchCards} = cardActions

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }

    const cardsTotalCount = useAppSelector(getCardsTotalCount)
    const {sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max} = useAppSelector(getSearchParamsCards)

    useEffect(() => {
        dispatch(fetchCards({packId}))
    }, [sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max, packId])

    return (<>
        {cardsTotalCount > 0 ? <CardsPage/> : <EmptyCardsPage/>}
    </>);
};