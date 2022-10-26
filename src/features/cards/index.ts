import {slice} from './reducer';
import {asyncActions} from './reducer';
import * as cardSelectors from './selectors'

const cardReducer = slice.reducer

const cardActions = {
    ...asyncActions,
    ...slice.actions,
}

export {
    cardReducer,
    cardActions,
    cardSelectors,
}