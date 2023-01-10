import React, { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import style from 'components/common/navLink/NavLink.module.scss';

type PropsType = {
  title: string;
  link: string;
};

export const NavLink = ({ title, link }: PropsType): ReactElement => {
  return (
    <Link to={link} className={style.userContainer}>
      <h1 className={style.name}>{title}</h1>
    </Link>
  );
};
