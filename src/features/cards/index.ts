import {cardsSlice} from './cardsSlice';
import {asyncActions} from './cardsSlice';
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