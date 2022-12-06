import React from 'react';
import s from "../CardsPage.module.scss";
import {Button} from "@mui/material";
import {PATH} from "../../../../common/enums/path";
import {AddCards} from "./AddCards/AddCards";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {getCardsStatus, getPackUserId} from "../../selectors";
import {getUserProfile} from "../../../profile/selectors";

export const CardButton = () => {
    const {packId} = useParams() as { packId: string }
    const navigate = useNavigate()

    const cardsStatus = useAppSelector(getCardsStatus)
    const packUserId = useAppSelector(getPackUserId)
    const {_id} = useAppSelector(getUserProfile)

    const isOwner = packUserId === _id
    const isLoadingCards = cardsStatus === 'loading'

    return (
        <div className={s.btnContainer}>
            <Button variant={'contained'}
                    color={'success'}
                    onClick={() => navigate(PATH.LEARN + packId)}
                    className={s.btn}
                    disabled={isLoadingCards}
            ><h4>Learn cards</h4>
            </Button>

            {
                isOwner && <AddCards packId={packId} disabled={isLoadingCards}/>
            }
        </div>
    );
};
