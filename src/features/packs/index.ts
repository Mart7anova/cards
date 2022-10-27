import {packsSlice} from './reducer';
import * as packSelectors from './selectors'
import {asyncActions} from './reducer';

const packReducer = packsSlice.reducer

const packActions = {
    ...asyncActions,
    ...packsSlice.actions,
}

export {
    packReducer,
    packSelectors,
    packActions
}