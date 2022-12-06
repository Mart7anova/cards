import React from 'react';
import s from "../Learn.module.scss";
import {addAlternateSrc} from "../../../../common/utils/addAlternateSrc";
import {CardType} from "../../api";

type PropsType = {
    card: CardType
}

export const Question = ({card}: PropsType) => {
    return (
        <>
            <h2 className={s.textContainer}>
                Question:
                {
                    card.question !== 'no question' && <span className={s.text}> {card.question}?</span>
                }
            </h2>
            {
                card.questionImg && <div className={s.wrapperImg}>
                    <img src={card.questionImg}
                         onError={addAlternateSrc}
                         alt={'pack name'}
                         className={s.img}/>
                </div>
            }
        </>
    );
};
