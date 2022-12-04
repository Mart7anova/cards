import {authSlice} from './authSlice';
import * as authSelectors from './selectors'
import {asyncActions} from './authSlice';

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