import React from 'react';
import {Container} from '@mui/material';
import s from './CardsPage.module.scss'
import {SearchByCardName} from './SearchByCardName/SearchByCardName';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getCards, getCardsStatus} from '../selectors';
import {CardTable} from "./CardTable/CardTable";
import {NoItems} from "../../../common/components/NoItems/NoItems";
import {CardButton} from "./CardButton/CardButton";
import {CardTitle} from "./CardTitle/CardTitle";

type PropsType = {
    setIsSearching: (isSearching: boolean) => void
}

export const CardsPage = ({setIsSearching}: PropsType) => {
    const cards = useAppSelector(getCards)
    const cardsStatus = useAppSelector(getCardsStatus)

    const isLoadingCards = cardsStatus === 'loading'
    const haveCards = !!cards.length

    return (
        <Container fixed>
            <div className={s.titleContainer}>
                <CardTitle/>
                <CardButton/>
            </div>

            <SearchByCardName setIsSearching={setIsSearching}/>

            {
                haveCards
                    ? <CardTable setIsSearching={setIsSearching}/>
                    : <NoItems isLoading={isLoadingCards}/>
            }
        </Container>
    );
};
