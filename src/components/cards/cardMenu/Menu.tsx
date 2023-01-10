import React, { ReactElement } from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MenuItem, MenuList, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import style from 'components/cards/cardMenu/CardMenu.module.scss';
import { DeleteModal } from 'components/common';
import { PackModal } from 'components/packModal';
import { Path } from 'enums';
import { useAppDispatch, useAppSelector, useModal } from 'hooks';
import { selectPackDeckCover, selectPackName } from 'store/selectors';
import { deletePack, fetchCards, updatePack } from 'store/thunks';

type PropsType = {
  closeMenu: () => void;
};

export const Menu = ({ closeMenu }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const { packId } = useParams() as { packId: string };
  const navigate = useNavigate();

  const { open, openModal, closeModal } = useModal();
  const { openEdit, openEditModal, closeEditModal } = useModal();

  const packName = useAppSelector(selectPackName);
  const packDeckCover = useAppSelector(selectPackDeckCover);

  const packUpdateHandle = async (
    packName: string,
    isPrivate: boolean,
    deckCover: string,
  ): Promise<void> => {
    closeMenu();
    await dispatch(updatePack({ id: packId, name: packName, isPrivate, deckCover }));
    await dispatch(fetchCards({ packId }));
    closeEditModal();
  };

  const packDeleteHandle = async (): Promise<void> => {
    await dispatch(deletePack({ id: packId }));
    closeModal();
    navigate(Path.PACKS);
  };

  return (
    <>
      <Paper className={style.menu}>
        <MenuList>
          <MenuItem onClick={openEditModal}>
            <BorderColorIcon sx={{ height: 20 }} />
            <p className={style.menuText}>Edit</p>
          </MenuItem>

          <MenuItem onClick={openModal}>
            <DeleteForeverIcon sx={{ height: 22 }} />
            <p className={style.menuText}>Delete</p>
          </MenuItem>
        </MenuList>
      </Paper>

      <PackModal
        title="Edit pack"
        deckCover={packDeckCover}
        open={openEdit}
        closeModal={closeEditModal}
        packName={packName}
        sentChanges={packUpdateHandle}
      />

      <DeleteModal
        title="Delete card"
        isPack
        deleteItem={packDeleteHandle}
        itemName={packName}
        open={open}
        closeModal={closeModal}
      />
    </>
  );
};
