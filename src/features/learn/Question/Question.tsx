import React, { ReactElement } from 'react';

import { addAlternateSrc } from 'common/utils/addAlternateSrc';
import { CardType } from 'features/cards/Types';
import style from 'features/learn/Learn.module.scss';

type PropsType = {
  card: CardType;
};

export const Question = ({ card }: PropsType): ReactElement => {
  return (
    <>
      <h2 className={style.textContainer}>
        Question:
        {card.question !== 'no question' && (
          <span className={style.text}> {card.question}?</span>
        )}
      </h2>

      {card.questionImg && (
        <div className={style.wrapperImg}>
          <img
            src={card.questionImg}
            onError={addAlternateSrc}
            alt="pack name"
            className={style.img}
          />
        </div>
      )}
    </>
  );
};
