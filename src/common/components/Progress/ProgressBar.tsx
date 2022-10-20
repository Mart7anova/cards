import React from 'react';
import {CircularProgress} from '@mui/material';

export const Progress = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
            <CircularProgress/>
        </div>
    );
};