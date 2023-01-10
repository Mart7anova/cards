import React, { ReactElement } from 'react';

import { TableBody, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { CardPackTitle } from 'components/packsTable/packTableBody/cardPackTitle';
import { PackIconsGroup } from 'components/packsTable/packTableBody/packIconsGroup';
import { useAppSelector } from 'hooks';
import { selectCardPacks } from 'store/selectors';

export const PacksTableBody = (): ReactElement => {
  const packs = useAppSelector(selectCardPacks);

  return (
    <TableBody>
      {packs.map(
        ({
          _id: packId,
          name,
          deckCover,
          cardsCount,
          updated,
          user_name: userName,
          user_id: userId,
        }) => (
          <TableRow key={packId}>
            <TableCell sx={{ overflowWrap: 'anywhere', width: '22%' }}>
              <CardPackTitle packId={packId} name={name} deckCover={deckCover} />
            </TableCell>

            <TableCell sx={{ width: '14%' }}>{cardsCount}</TableCell>

            <TableCell sx={{ width: '18%' }}>
              {dayjs(updated).format(`DD.MM.YYYY`)}
            </TableCell>

            <TableCell sx={{ overflowWrap: 'anywhere', width: '27%' }}>
              {userName}
            </TableCell>

            <TableCell sx={{ width: '18%' }}>
              <PackIconsGroup
                packUserId={userId}
                packId={packId}
                packName={name}
                cardsCount={cardsCount}
                deckCover={deckCover}
              />
            </TableCell>
          </TableRow>
        ),
      )}
    </TableBody>
  );
};
