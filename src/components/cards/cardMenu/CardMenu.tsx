import React, { ReactElement, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Tooltip } from '@mui/material';

import style from 'components/cards/cardMenu/CardMenu.module.scss';
import { Menu } from 'components/cards/cardMenu/Menu';

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
