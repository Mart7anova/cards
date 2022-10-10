import {asyncActions, slice} from './reducer';
import * as appSelectors from './selectors'
import {createAction} from '@reduxjs/toolkit';
import {ErrorType} from '../../common/types/errorType';

const appReducer = slice.reducer

const setAppError = createAction<ErrorType>('appActions/setAppError')

const appActions = {
    ...asyncActions,
    ...slice.actions,
    setAppError
}

export {
    appReducer,
    appActions,
    appSelectors
}