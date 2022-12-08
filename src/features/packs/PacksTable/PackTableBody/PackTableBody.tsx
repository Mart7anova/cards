import React from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { PackIconsGroup } from './PackIconsGroup/PackIconsGroup';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getCardPacks } from '../../selectors';
import { CardPackTitle } from './CardPackTitle/CardPackTitle';

export const PackTableBody = () => {
  const packs = useAppSelector(getCardPacks);

  return (
    <TableBody>
      {
        packs.map(pack => (
          <TableRow key={pack._id}>
            <TableCell sx={{ overflowWrap: 'anywhere', width: '25%' }}>
              <CardPackTitle packId={pack._id} name={pack.name}
                             deckCover={pack.deckCover} />
            </TableCell>

            <TableCell sx={{ width: '14%' }}>
              {pack.cardsCount}
            </TableCell>

            <TableCell sx={{ width: '20%' }}>
              {dayjs(pack.updated).format(`DD.MM.YYYY`)}
            </TableCell>

            <TableCell sx={{ overflowWrap: 'anywhere', width: '25%' }}>
              {pack.user_name}
            </TableCell>

            <TableCell sx={{ width: '16%' }}>
              <PackIconsGroup packUserId={pack.user_id}
                              packId={pack._id}
                              packName={pack.name}
                              cardsCount={pack.cardsCount}
                              deckCover={pack.deckCover}
              />
            </TableCell>
          </TableRow>
        ))
      }
    </TableBody>
  );
};
