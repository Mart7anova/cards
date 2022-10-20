import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getCardsStatus, getCardsTotalCount, getSearchParamsCards} from './selectors';
import {CardsPage} from './CardsPage/CardsPage';
import {EmptyCardsPage} from './EmptyCardsPage/EmptyCardsPage';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {cardActions} from './index';
import {useParams} from 'react-router-dom';
import {Progress} from '../../common/components/Progress/ProgressBar';

const {fetchCards} = cardActions

export const Cards = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const [isSearching, setIsSearching] = useState(false)

    const cardsTotalCount = useAppSelector(getCardsTotalCount)
    const cardsStatus = useAppSelector(getCardsStatus)
    const {sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max} = useAppSelector(getSearchParamsCards)

    useEffect(() => {
        dispatch(fetchCards({packId}))
    }, [sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max, packId])

    if(!isSearching && cardsStatus==='loading'){
        return <Progress />
    }

    return (
        <>
            {cardsTotalCount > 0 || isSearching ? <CardsPage setIsSearching={setIsSearching}/> : <EmptyCardsPage/>}
        </>);
};