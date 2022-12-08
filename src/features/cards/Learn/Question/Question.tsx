import React from 'react';
import style from '../Learn.module.scss';
import { addAlternateSrc } from 'common/utils/addAlternateSrc';
import { CardType } from '../../api';

type PropsType = {
  card: CardType
}

export const Question = ({ card }: PropsType) => {
  return (
    <>
      <h2 className={style.textContainer}>
        Question:
        {
          card.question !== 'no question' &&
          <span className={style.text}> {card.question}?</span>
        }
      </h2>
      {
        card.questionImg && <div className={style.wrapperImg}>
          <img src={card.questionImg}
               onError={addAlternateSrc}
               alt={'pack name'}
               className={style.img} />
        </div>
      }
    </>
  );
};
