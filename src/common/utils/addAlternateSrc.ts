import {SyntheticEvent} from 'react';
import brokenFile from '../../assets/images/broken-file.png';

export const addAlternateSrc = (e: SyntheticEvent<HTMLImageElement, Event>) =>{
    e.currentTarget.src = brokenFile
}