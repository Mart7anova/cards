import {Container} from '@mui/material';
import React from 'react';
import {useAppSelector} from '../../../common/hooks/useAppSelector';
import {getPackName, getPackUserId} from '../selectors';
import {CardMenu} from '../CardMenu/CardMenu';
import {useParams} from 'react-router-dom';
import {getProfile} from '../../profile/selectors';
import {AddCards} from '../CardsPage/AddCards/AddCards';
import s from './EmptyCardsPage.module.scss'

export const EmptyCardsPage = () => {
    const {packId} = useParams() as { packId: string }

    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId)
    const {_id} = useAppSelector(getProfile)

    const isOwner = packUserId === _id

    return (
        <Container fixed sx={{mt: 5}}>
            <h1>
                {packName}
                {
                    isOwner && <CardMenu packId={packId} packName={packName}/>
                }
            </h1>
            {
                isOwner
                    ? <div className={s.infoContainer}>
                        <h2 className={s.infoTitle}>
                            This pack is empty. <br/>Click <span>add new card</span> to fill this pack.
                        </h2>
                        <AddCards packId={packId}/>
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
