import {asyncActions, slice} from './reducer';
import * as appSelectors from './selectors'
import {createAction} from '@reduxjs/toolkit';
import {infoType} from '../../common/types/infoType';

const appReducer = slice.reducer

const setAppError = createAction<infoType>('appActions/setAppError')
const setAppSuccess = createAction<infoType>('appActions/setAppSuccess')

const appActions = {
    ...asyncActions,
    ...slice.actions,
    setAppError,
    setAppSuccess,
}

export {
    appReducer,
    appActions,
    appSelectors
}