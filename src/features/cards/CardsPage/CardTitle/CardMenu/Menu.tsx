import React, { ReactElement } from 'react';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MenuItem, MenuList, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { DeleteModal } from 'common/components/DeleteModel/DeleteModal';
import { Path } from 'common/enums/Path';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useModal } from 'common/hooks/useModal';
import style from 'features/cards/CardsPage/CardTitle/CardMenu/CardMenu.module.scss';
import { selectPackDeckCover, selectPackName } from 'features/cards/selectors';
import { fetchCards } from 'features/cards/slice';
import { PackModal } from 'features/packs/PackModal/PackModal';
import { deletePack, updatePack } from 'features/packs/slice';

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
