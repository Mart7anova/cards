import React from 'react';
import s from './PageNotFound.module.scss';
import {Button, Container} from '@mui/material';
import notFound from '../../../assets/images/404.gif'
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../enums/path';

export const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <Container className={s.pageContainer}>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <Button variant={'contained'} size={'large'} className={s.btn} onClick={()=>navigate(PATH.PACKS)}>go back home</Button>
            <img src={notFound} alt=" "/>
        </Container>
    );
};