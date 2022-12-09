import * as React from 'react';
import { ReactElement, ReactNode } from 'react';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import style from './BasicModal.module.scss';

const styleBox = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 3,
};

type PropsType = {
  children: ReactNode;
  title: string;
  open: boolean;
  closeModal: () => void;
};

export const BasicModal = (props: PropsType): ReactElement => {
  const { children, title, open, closeModal } = props;

  return (
    <Modal open={open} onClose={closeModal}>
      <Box sx={styleBox}>
        <div className={style.headerContainer}>
          <h1 className={style.header}>{title}</h1>
          <ClearRoundedIcon className={style.iconClose} onClick={closeModal} />
        </div>

        <div className={style.childrenContainer}>{children}</div>
      </Box>
    </Modal>
  );
};
