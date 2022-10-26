import {Cards} from './Cards';
import {asyncActions, slice} from './reducer';
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
    Cards,
}