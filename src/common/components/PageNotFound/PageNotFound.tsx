import React from 'react';
import {PATH} from '../../enums/path';
import {Link} from 'react-router-dom';
import s from './PageNotFound.module.scss';

export const PageNotFound = () => {
    return (
        <div>
            <div className={s.pageContainer}>
                <h1>Error 404</h1>
                <h2>Page not found</h2>
                <span>Go <Link to={PATH.PACKS}>home</Link></span>
            </div>
        </div>
    );
};