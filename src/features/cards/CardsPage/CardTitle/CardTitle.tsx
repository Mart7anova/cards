import React from 'react';
import style from "../CardsPage.module.scss";
import {CardMenu} from "../../CardMenu/CardMenu";
import {addAlternateSrc} from "../../../../common/utils/addAlternateSrc";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {getPackDeckCover, getPackName, getPackUserId} from "../../selectors";
import {getUserProfile} from "../../../profile/selectors";

export const CardTitle = () => {
    const packName = useAppSelector(getPackName)
    const packUserId = useAppSelector(getPackUserId)
    const packDeckCover = useAppSelector(getPackDeckCover)
    const {_id} = useAppSelector(getUserProfile)

    const isOwner = packUserId === _id

    return (
        <h1 className={style.titleName}>
            {packName}
            {
                isOwner && <CardMenu/>
            }
            {
                packDeckCover && <img src={packDeckCover}
                                      className={style.img}
                                      onError={addAlternateSrc}
                                      alt={' '}/>
            }
        </h1>
    );
};