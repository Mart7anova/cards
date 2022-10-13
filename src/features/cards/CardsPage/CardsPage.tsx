import React from 'react';
import {Button, Container} from '@mui/material';
import s from './CardsPage.module.scss'
import {CardMenu} from '../CardMenu/CardMenu';
import {SearchByCardName} from './SearchByCardName/SearchByCardName';
import {CardsTable} from './CardsTable/CardsTable';
import {SkeletonTable} from '../../../common/components/SkeletonTable/SkeletonTable';
import {NoResult} from '../../../common/components/NoResult/NoResult';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {
    getCards,
    getCardsStatus,
    getCardsTotalCount,
    getPackName,
    getPackUserId,
    getPageCards,
    getPageCountCards
} from '../selectors';
import {getProfile} from '../../profile/selectors';
import {AddCards} from './AddCards/AddCards';


export const CardsPage = () => {
    const {packId} = useParams() as { packId: string }

    const cards = useAppSelector(getCards)
    const pageCards = useAppSelector(getPageCards)
    const pageCountCards = useAppSelector(getPageCountCards)
    const cardsTotalCount = useAppSelector(getCardsTotalCount)
    const cardsStatus = useAppSelector(getCardsStatus)

    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId)
    const {_id} = useAppSelector(getProfile)

    const isOwner = packUserId === _id


    return (
        <Container fixed>
            <div className={s.titleContainer}>
                <h1 className={s.titleName}>
                    {packName}
                    {
                        isOwner && <CardMenu packId={packId} packName={packName}/>
                    }
                </h1>

                <div className={s.btnContainer}>
                    <Button variant={'contained'}
                            color={'success'}
                            onClick={()=>{alert('do it')}}
                            className={s.btn}>Learn cards</Button>

                    {
                        isOwner && <AddCards packId={packId}/>
                    }
                </div>
            </div>

            <SearchByCardName/>

            {
                cards.length
                    ? <CardsTable cards={cards}
                                  isOwner={isOwner}
                                  page={pageCards}
                                  count={cardsTotalCount}
                                  rowsPerPage={pageCountCards}/>
                    : cardsStatus === 'loading'
                        ? <SkeletonTable/>
                        : <NoResult/>
            }

        </Container>
    );
};
