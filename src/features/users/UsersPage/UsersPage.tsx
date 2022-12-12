import React, { ReactElement } from 'react';

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import noUserPhoto from 'common/assets/images/no-user-photo.png';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectUsers } from 'features/users/selectors';

export const UsersPage = (): ReactElement => {
  const users = useAppSelector(selectUsers);

  return (
    <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
      {users.map(({ _id: userId, name, email, avatar, publicCardPacksCount }) => (
        <div key={userId}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={name} src={avatar || noUserPhoto} />
            </ListItemAvatar>
            <ListItemText
              primary={<b>{name}</b>}
              secondary={
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography component="span" variant="body2" color="text.primary">
                    {email}
                  </Typography>
                  <Typography component="span" variant="body2" color="text.primary">
                    {publicCardPacksCount}
                  </Typography>
                </div>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
};
