import {slice} from './reducer';
import * as authSelectors from './selectors'
import {asyncActions} from './reducer';

const authReducer = slice.reducer

const authActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    authReducer,
    authSelectors,
    authActions,
}