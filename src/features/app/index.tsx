import {asyncActions, appSlice} from './appSlice';
import * as appSelectors from './selectors'
import {createAction} from '@reduxjs/toolkit';
import {infoType} from '../../common/types/infoType';

const appReducer = appSlice.reducer

const setAppError = createAction<infoType>('appActions/setAppError')
const setAppSuccess = createAction<infoType>('appActions/setAppSuccess')

const appActions = {
    ...asyncActions,
    ...appSlice.actions,
    setAppError,
    setAppSuccess,
}

export {
    appReducer,
    appActions,
    appSelectors
}