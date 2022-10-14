import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cardsApi, CardSearchParamsType, CardsResponseType, CardType} from '../../api/cardsApi';
import {AppRootStateType} from '../../app/store';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {StatusType} from '../../common/types/statusType';

const fetchCards = createAsyncThunk('cards/fetchCards',
    async (param: { packId: string }, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as AppRootStateType
            const searchParams = state.card.searchParams

            const {data} = await cardsApi.getCards(param.packId, searchParams)
            return data
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const createCard = createAsyncThunk('cards/createCard',
    async (param: { packId: string, question: string, answer: string }, {dispatch, rejectWithValue}) => {
        try {
            await cardsApi.createCard(param.packId, param.question, param.answer)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const deleteCard = createAsyncThunk('cards/deleteCard',
    async (param: { cardId: string }, {dispatch, rejectWithValue}) => {
        try {
            await cardsApi.deleteCard(param.cardId)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const updateCard = createAsyncThunk('cards/updateCard',
    async (param: { cardId: string, question: string, answer: string }, {dispatch, rejectWithValue}) => {
        try {
            await cardsApi.updateCard(param.cardId, param.question, param.answer)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const updateCardGrade = createAsyncThunk('cards/updateCardGrade',
    async (param: { card_id: string, grade: number }, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await cardsApi.updateCardsGrade(param.card_id, param.grade)
            return data
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

export const asyncActions = {
    fetchCards,
    createCard,
    deleteCard,
    updateCard,
    updateCardGrade,
}

export const slice = createSlice({
    name: 'cards',
    initialState: {
        cardsState: {
            cards: [] as CardType[]
        } as CardsResponseType,
        searchParams: {
            page: 1,
            pageCount: 10,
            cardQuestion: '',
        } as CardSearchParamsType,
        status: 'idle' as StatusType
    },
    reducers: {
        resetCardsState: (state) => {
            const initialState = slice.getInitialState()
            state.searchParams = initialState.searchParams
            state.cardsState = initialState.cardsState
        },
        setSearchParams: (state, action:PayloadAction<CardSearchParamsType>) => {
            state.searchParams = {...state.searchParams, ...action.payload}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cardsState = action.payload
                state.status = 'idle'
            })

            .addCase(createCard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createCard.fulfilled, (state) => {
                state.status = 'idle'
            })

            .addCase(deleteCard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteCard.fulfilled, (state) => {
                state.status = 'idle'
            })

            .addCase(updateCard.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateCard.fulfilled, (state) => {
                state.status = 'idle'
            })

            .addCase(updateCardGrade.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateCardGrade.fulfilled, (state, action) => {
                const index = state.cardsState.cards.findIndex(s => s._id === action.payload.updatedGrade.card_id)
                state.cardsState.cards[index].grade = action.payload.updatedGrade.grade
                state.cardsState.cards[index].shots = action.payload.updatedGrade.shots
                state.status = 'idle'
            })
    }
})