import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import style from './CardMenu.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu } from './Menu';

export const CardMenu = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onClickHandler = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <>
      <Tooltip title='open menu' className={style.iconMenu} onClick={onClickHandler}>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      {
        isMenuOpened && <Menu closeMenu={() => setIsMenuOpened(false)} />
      }
    </>
  );
};
