import {cardsSlice} from './reducer';
import {asyncActions} from './reducer';
import * as cardSelectors from './selectors'

const cardReducer = cardsSlice.reducer

const cardActions = {
    ...asyncActions,
    ...cardsSlice.actions,
}

export {
    cardReducer,
    cardActions,
    cardSelectors,
}