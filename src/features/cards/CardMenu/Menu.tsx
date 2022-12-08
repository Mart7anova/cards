import React from 'react';
import { MenuItem, MenuList, Paper } from '@mui/material';
import style from './CardMenu.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PackModal } from '../../packs/PackModal/PackModal';
import { DeleteModal } from 'common/components/DeleteModel/DeleteModal';
import { deletePack, updatePack } from '../../packs/slice';
import { fetchCards } from '../slice';
import { PATH } from 'common/enums/path';
import { useModal } from 'common/hooks/useModal';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getPackDeckCover, getPackName } from '../selectors';

type PropsType = {
  closeMenu: () => void
}

export const Menu = ({ closeMenu }: PropsType) => {
  const { packId } = useParams() as { packId: string };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { open, openModal, closeModal } = useModal();
  const { openEdit, openEditModal, closeEditModal } = useModal();

  const packName = useAppSelector(getPackName);
  const packDeckCover = useAppSelector(getPackDeckCover);

  const packUpdateHandle = async (packName: string, isPrivate: boolean, deckCover: string) => {
    closeMenu();
    await dispatch(updatePack({ id: packId, name: packName, isPrivate, deckCover }));
    await dispatch(fetchCards({ packId }));
    closeEditModal();
  };

  const packDeleteHandle = async () => {
    await dispatch(deletePack({ id: packId }));
    closeModal();
    navigate(PATH.PACKS);
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

      <PackModal title={'Edit pack'}
                 deckCover={packDeckCover}
                 open={openEdit}
                 closeModal={closeEditModal}
                 packName={packName}
                 sentChanges={packUpdateHandle}
      />

      <DeleteModal title={'Delete card'}
                   isPack
                   deleteItem={packDeleteHandle}
                   itemName={packName}
                   open={open}
                   closeModal={closeModal}
      />
    </>
  );
};
