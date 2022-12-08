import React from 'react';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { setCardsSearchParams } from '../../../slice';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectPackUserId } from '../../../selectors';
import { selectUserProfile } from 'features/profile/selectors';
import { useToggle } from 'common/hooks/useToggle';

const headers = [
  { name: 'Question', sortName: 'question' },
  { name: 'Answer', sortName: 'answer' },
  { name: 'Last update', sortName: 'updated' },
  { name: 'Shots', sortName: 'shots' },
  { name: 'Grade', sortName: 'grade' },
];

export const CardTableHead = () => {
  const dispatch = useAppDispatch();
  const [isHeaderSorted, toggleHeaderSort] = useToggle(true);

  const packUserId = useAppSelector(selectPackUserId);
  const { _id } = useAppSelector(selectUserProfile);

  const isOwner = packUserId === _id;

  const sortPacksChangeHandler = (isHeaderSorted: boolean, sortName: string) => {
    return () => {
      let sortValue;

      if (isHeaderSorted) {
        sortValue = '1' + sortName;
      } else {
        sortValue = '0' + sortName;
      }
      dispatch(setCardsSearchParams({ sortCards: sortValue }));
    };
  };
  return (
    <TableHead>
      <TableRow>
        {
          headers.map(header => (
            <TableCell key={header.name}>
              {header.name}
              <Checkbox icon={<ExpandMoreIcon />}
                        checkedIcon={<ExpandLessIcon />}
                        color={'default'}
                        onClick={toggleHeaderSort}
                        onChange={sortPacksChangeHandler(isHeaderSorted, header.sortName)}
              />
            </TableCell>
          ))
        }
        {
          isOwner && <TableCell>Actions</TableCell>
        }
      </TableRow>
    </TableHead>
  );
};
