import React, {useState} from 'react';
import {IconButton, Tooltip} from '@mui/material';
import s from './CardMenu.module.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Menu} from "./Menu";

export const CardMenu = () => {
    const [openMenu, setOpenMenu] = useState(false)

    const onClickHandler = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <>
            <Tooltip title="open menu" className={s.iconMenu} onClick={onClickHandler}>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </Tooltip>
            {
                openMenu && <Menu closeMenu={()=>setOpenMenu(false)}/>
            }
        </>
    );
};
