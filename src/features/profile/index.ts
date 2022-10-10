import {asyncActions, slice} from './reducer';
import * as profileSelectors from './selectors'

const profileReducer = slice.reducer

const profileActions = {
    ...asyncActions,
    ...slice.actions
}

export {
    profileReducer,
    profileSelectors,
    profileActions
}