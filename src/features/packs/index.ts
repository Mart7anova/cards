import {slice} from './reducer';
import * as packSelectors from './selectors'
import {asyncActions} from './reducer';

const packReducer = slice.reducer

const packActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    packReducer,
    packSelectors,
    packActions
}