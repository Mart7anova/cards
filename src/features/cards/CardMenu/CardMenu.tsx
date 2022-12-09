import React, { ReactElement, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Tooltip } from '@mui/material';

import style from './CardMenu.module.scss';
import { Menu } from './Menu';

export const CardMenu = (): ReactElement => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const onClickHandler = (): void => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <>
      <Tooltip title="open menu" className={style.iconMenu} onClick={onClickHandler}>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      {isMenuOpened && <Menu closeMenu={() => setIsMenuOpened(false)} />}
    </>
  );
};
