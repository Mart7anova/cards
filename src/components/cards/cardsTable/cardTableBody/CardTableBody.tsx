import React, { ReactElement } from 'react';

import { Rating, TableBody, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { CardIconsGroup } from 'components/cards/cardsTable/cardTableBody/cardIconsGroup';
import { useAppSelector } from 'hooks';
import { selectCards, selectPackUserId, selectProfile } from 'store/selectors';
import { addAlternateSrc } from 'utils';

type PropsType = {
  setIsSearching: (isSearching: boolean) => void;
};

export const CardTableBody = ({ setIsSearching }: PropsType): ReactElement => {
  const cards = useAppSelector(selectCards);
  const packUserId = useAppSelector(selectPackUserId);
  const { _id: profileId } = useAppSelector(selectProfile);

  const isOwner = packUserId === profileId;

  return (
    <TableBody>
      {cards.map(
        ({
          _id: cardId,
          questionImg,
          question,
          answer,
          updated,
          shots,
          grade,
          cardsPack_id: packId,
        }) => (
          <TableRow key={cardId}>
            <TableCell sx={{ overflowWrap: 'anywhere', width: '30%' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                {questionImg && (
                  <img
                    src={questionImg}
                    onError={addAlternateSrc}
                    alt="pack name"
                    style={{
                      height: '50px',
                      marginRight: '10px',
                    }}
                  />
                )}
                {question !== 'no question' && <p>{question}</p>}
              </div>
            </TableCell>

            <TableCell sx={{ overflowWrap: 'anywhere', width: '20%' }}>
              {answer}
            </TableCell>

            <TableCell sx={{ width: '20%' }}>
              {dayjs(updated).format(`DD.MM.YYYY`)}
            </TableCell>

            <TableCell sx={{ width: '10%' }}>{shots}</TableCell>

            <TableCell sx={{ width: '10%' }}>
              <Rating value={grade} readOnly />
            </TableCell>

            {isOwner && (
              <TableCell sx={{ width: '10%' }}>
                <CardIconsGroup
                  packId={packId}
                  cardId={cardId}
                  question={question}
                  questionImg={questionImg}
                  answer={answer}
                  setIsSearching={setIsSearching}
                />
              </TableCell>
            )}
          </TableRow>
        ),
      )}
    </TableBody>
  );
};
