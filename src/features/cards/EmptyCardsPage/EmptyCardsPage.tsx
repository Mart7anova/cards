import {Container} from '@mui/material';
import React from 'react';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getCardsStatus, getPackDeckCover, getPackName, getPackUserId} from '../selectors';
import {CardMenu} from '../CardMenu/CardMenu';
import {useParams} from 'react-router-dom';
import {getUserProfile} from '../../profile/selectors';
import {AddCards} from '../CardsPage/CardButton/AddCards/AddCards';
import s from './EmptyCardsPage.module.scss'

export const EmptyCardsPage = () => {
    const {packId} = useParams() as { packId: string }

    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId)
    const packDeckCover = useAppSelector(getPackDeckCover)
    const {_id} = useAppSelector(getUserProfile)
    const cardsStatus = useAppSelector(getCardsStatus)

    const isOwner = packUserId === _id
    const isLoadingCards = cardsStatus === 'loading'

    return (
        <Container fixed sx={{mt: 5}}>
            <h1 className={s.titleName}>
                {packName}
                {
                    isOwner && <CardMenu />
                }
                {
                    packDeckCover && <img src={packDeckCover} className={s.img} alt={''}/>
                }
            </h1>
            {
                isOwner
                    ? <div className={s.infoContainer}>
                        <h2 className={s.infoTitle}>
                            This pack is empty.
                            <br/>
                            Click <span>add new card</span> to fill this pack.
                        </h2>
                        <AddCards packId={packId} disabled={isLoadingCards}/>
                    </div>

                    : <div className={s.infoContainer}>
                        <h2 className={s.infoTitle}>
                            This pack is empty.
                        </h2>
                    </div>
            }
        </Container>
    );
};
