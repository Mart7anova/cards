import React from 'react';
import { Rating, TableBody, TableCell, TableRow } from '@mui/material';
import { addAlternateSrc } from 'common/utils/addAlternateSrc';
import dayjs from 'dayjs';
import { CardIconsGroup } from './CardIconsGroup/CardIconsGroup';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectCards, selectPackUserId } from '../../../selectors';
import { selectUserProfile } from 'features/profile/selectors';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void
}

export const CardTableBody = ({ setIsSearching }: PropsType) => {
  const cards = useAppSelector(selectCards);
  const packUserId = useAppSelector(selectPackUserId);
  const { _id } = useAppSelector(selectUserProfile);

  const isOwner = packUserId === _id;

  return (
    <TableBody>
      {
        cards.map(card => (
          <TableRow key={card._id}>
            <TableCell sx={{ overflowWrap: 'anywhere', width: '30%' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {
                  card.questionImg && <img src={card.questionImg}
                                           onError={addAlternateSrc}
                                           alt={'pack name'}
                                           style={{
                                             height: '50px',
                                             marginRight: '10px',
                                           }} />
                }
                {
                  card.question !== 'no question' && <p>{card.question}</p>
                }
              </div>
            </TableCell>
            <TableCell sx={{ overflowWrap: 'anywhere', width: '20%' }}>
              {card.answer}
            </TableCell>
            <TableCell sx={{ width: '20%' }}>
              {dayjs(card.updated).format(`DD.MM.YYYY`)}
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              {card.shots}
            </TableCell>
            <TableCell sx={{ width: '10%' }}>
              <Rating value={card.grade} readOnly />
            </TableCell>
            {
              isOwner && <TableCell sx={{ width: '10%' }}>
                <CardIconsGroup packId={card.cardsPack_id}
                                cardId={card._id}
                                cardName={card.question}
                                question={card.question}
                                questionImg={card.questionImg}
                                answer={card.answer}
                                setIsSearching={setIsSearching}
                />
              </TableCell>
            }
          </TableRow>
        ))
      }
    </TableBody>
  );
};