import React, { ReactElement } from 'react';

import { TableBody, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';

import { selectCardPacks } from '../../selectors';

import { CardPackTitle } from './CardPackTitle/CardPackTitle';
import { PackIconsGroup } from './PackIconsGroup/PackIconsGroup';

import { useAppSelector } from 'common/hooks/useAppSelector';

export const PackTableBody = (): ReactElement => {
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
