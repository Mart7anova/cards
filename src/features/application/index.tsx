import {asyncActions, slice} from './reducer';
import * as appSelectors from './selectors'

const appReducer = slice.reducer

const appActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    appReducer,
    appActions,
    appSelectors
}