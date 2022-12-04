import {packsSlice} from './packsSlice';
import * as packSelectors from './selectors'
import {asyncActions} from './packsSlice';

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