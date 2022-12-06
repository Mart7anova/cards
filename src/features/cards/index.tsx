import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../common/hooks/useAppSelector';
import {getCardsStatus, getCardsTotalCount, getSearchParamsCards} from './selectors';
import {CardsPage} from './CardsPage/CardsPage';
import {EmptyCardsPage} from './EmptyCardsPage/EmptyCardsPage';
import {useAppDispatch} from '../../common/hooks/useAppDispatch';
import {useParams} from 'react-router-dom';
import {fetchCards} from "./slice";
import {SkeletonCardPage} from "./SkeletonCardPage/SkeletonCardPage";


export const Cards = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const [isSearching, setIsSearching] = useState(false)

    const cardsTotalCount = useAppSelector(getCardsTotalCount)
    const cardsStatus = useAppSelector(getCardsStatus)
    const {sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max} = useAppSelector(getSearchParamsCards)

    const haveCards = cardsTotalCount > 0 || isSearching
    const isLoadingCards = !isSearching && cardsStatus==='loading'

    useEffect(() => {
        dispatch(fetchCards({packId}))
    }, [sortCards, cardsPack_id, cardQuestion, min, page, pageCount, max, packId])

    if(isLoadingCards){
        return <SkeletonCardPage />
    }

    return (
        <>
            {
                haveCards
                    ? <CardsPage setIsSearching={setIsSearching}/>
                    : <EmptyCardsPage/>
            }
        </>
    );
};