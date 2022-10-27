import {authSlice} from './reducer';
import * as authSelectors from './selectors'
import {asyncActions} from './reducer';

const authReducer = authSlice.reducer

const authActions = {
    ...asyncActions,
    ...authSlice.actions,
}

export {
    authReducer,
    authSelectors,
    authActions,
}