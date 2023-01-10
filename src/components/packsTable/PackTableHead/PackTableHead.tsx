import React, { ReactElement } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

import { useAppDispatch, useToggle } from 'hooks';
import { setPacksSearchParams } from 'store/slices';

const headers = [
  { name: 'Name', sortName: 'name' },
  { name: 'Cards', sortName: 'cardsCount' },
  { name: 'Last update', sortName: 'updated' },
  { name: 'Create by', sortName: 'user_name' },
];

export const PackTableHead = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [isHeaderSorted, toggleHeaderSort] = useToggle(true);

  const packsSortChangeHandler = (isHeaderSorted: boolean, sortName: string) => {
    return () => {
      let sortValue;

      if (isHeaderSorted) {
        sortValue = `1${sortName}`;
      } else {
        sortValue = `0${sortName}`;
      }
      dispatch(setPacksSearchParams({ sortPacks: sortValue }));
    };
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name, sortName }) => (
          <TableCell key={name}>
            {name}

            <Checkbox
              icon={<ExpandMoreIcon />}
              checkedIcon={<ExpandLessIcon />}
              color="default"
              onClick={toggleHeaderSort}
              onChange={packsSortChangeHandler(isHeaderSorted, sortName)}
            />
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};
