import React, { ReactElement } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import { selectPackUserId } from '../../../selectors';
import { setCardsSearchParams } from '../../../slice';

import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useToggle } from 'common/hooks/useToggle';
import { selectProfile } from 'features/profile/selectors';

const HEADERS = [
  { name: 'Question', sortName: 'question' },
  { name: 'Answer', sortName: 'answer' },
  { name: 'Last update', sortName: 'updated' },
  { name: 'Shots', sortName: 'shots' },
  { name: 'Grade', sortName: 'grade' },
];

export const CardTableHead = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [isHeaderSorted, toggleHeaderSort] = useToggle(true);

  const packUserId = useAppSelector(selectPackUserId);
  const { _id } = useAppSelector(selectProfile);

  const isOwner = packUserId === _id;

  const sortPacksChangeHandler = (isHeaderSorted: boolean, sortName: string) => {
    return () => {
      let sortValue;

      if (isHeaderSorted) {
        sortValue = `1${sortName}`;
      } else {
        sortValue = `0${sortName}`;
      }
      dispatch(setCardsSearchParams({ sortCards: sortValue }));
    };
  };

  return (
    <TableHead>
      <TableRow>
        {HEADERS.map(({ name, sortName }) => (
          <TableCell key={name}>
            {name}
            <Checkbox
              icon={<ExpandMoreIcon />}
              checkedIcon={<ExpandLessIcon />}
              color="default"
              onClick={toggleHeaderSort}
              onChange={sortPacksChangeHandler(isHeaderSorted, sortName)}
            />
          </TableCell>
        ))}

        {isOwner && <TableCell>Actions</TableCell>}
      </TableRow>
    </TableHead>
  );
};
