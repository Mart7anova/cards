import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {packApi, PackSearchParamsType, PackType, ResponseCardPacksType} from '../../api/packApi';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {AppRootStateType} from '../../app/store';
import {StatusType} from '../../common/types/statusType';

const fetchPacks = createAsyncThunk('packs/fetchPacks',
    async (param, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as AppRootStateType
            const searchParams = state.pack.packsSearchParams

            const {data} = await packApi.getPacks(searchParams)
            return data
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const createNewPack = createAsyncThunk('packs/createNewPack',
    async (param: { name: string, isPrivate: boolean, deckCover: string }, {dispatch, rejectWithValue}) => {
        try {
            await packApi.createPack(param.name, param.isPrivate, param.deckCover)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
const deletePack = createAsyncThunk('packs/deletePack',
    async (param: { id: string }, {dispatch, rejectWithValue}) => {
        try {
            await packApi.deletePack(param.id)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const updatePack = createAsyncThunk('packs/updatePack',
    async (param: { id: string, name: string, isPrivate: boolean, deckCover: string}, {dispatch, rejectWithValue}) => {
        try {
            await packApi.updatePack(param.id, param.name, param.isPrivate, param.deckCover)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

export const asyncActions = {
    fetchPacks,
    createNewPack,
    deletePack,
    updatePack
}

export const slice = createSlice({
    name: 'packs',
    initialState: {
        packs: {
            cardPacks: [] as PackType[]
        } as ResponseCardPacksType,
        packsSearchParams: {
            page: 1,
            pageCount: 5,
            packName: '',
        } as PackSearchParamsType,
        isFirstLoading: true,
        status: 'idle' as StatusType
    },
    reducers: {
        setPacksSearchParams: (state, action: PayloadAction<PackSearchParamsType>) => {
            state.packsSearchParams = {...state.packsSearchParams, ...action.payload}
        },
        clearSearchParams: (state) => {
            const initialState = slice.getInitialState()
            state.packsSearchParams = initialState.packsSearchParams
        },
        setIsMyPacksFilter: (state, action: PayloadAction<string>) => {
            state.packsSearchParams.user_id = action.payload
            state.packsSearchParams.page = 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPacks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchPacks.fulfilled, (state, action) => {
                state.packs = action.payload
                if (state.isFirstLoading) {
                    state.packsSearchParams.min = action.payload.minCardsCount
                    state.packsSearchParams.max = action.payload.maxCardsCount
                    state.isFirstLoading = false
                }
                state.status = 'idle'
            })
            .addCase(fetchPacks.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(createNewPack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createNewPack.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(createNewPack.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(deletePack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deletePack.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(deletePack.rejected, (state) => {
                state.status = 'idle'
            })

            .addCase(updatePack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updatePack.fulfilled, (state) => {
                state.status = 'idle'
            })
            .addCase(updatePack.rejected, (state) => {
                state.status = 'idle'
            })
    }
})
