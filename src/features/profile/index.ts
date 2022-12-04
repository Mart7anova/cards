import {asyncActions, profileSlice} from './profileSlice';
import * as profileSelectors from './selectors'

const profileReducer = profileSlice.reducer

const profileActions = {
    ...asyncActions,
    ...profileSlice.actions,
}

export {
    profileReducer,
    profileSelectors,
    profileActions,
}