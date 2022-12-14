import React, { ReactElement } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import { useAppDispatch, useAppSelector, useToggle } from 'hooks';
import { selectPackUserId, selectProfile } from 'store/selectors';
import { setCardsSearchParams } from 'store/slices';

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
  const { _id: profileId } = useAppSelector(selectProfile);

  const isOwner = packUserId === profileId;

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
