import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {packApi, PackSearchParamsType, PackType, ResponseCardPacksType} from './api';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {AppRootStateType} from '../../app/store';
import {StatusType} from '../../common/types/StatusType';

export const fetchPacks = createAsyncThunk('packs/fetchPacks',
    async (param, {dispatch, getState, rejectWithValue}) => {
        dispatch(setPacksStatus('loading'))
        try {
            const state = getState() as AppRootStateType
            const searchParams = state.pack.packsSearchParams

            const {data} = await packApi.getPacks(searchParams)
            return data
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setPacksStatus('idle'))
        }
    })

export const createNewPack = createAsyncThunk('packs/createNewPack',
    async (param: { name: string, isPrivate: boolean, deckCover: string }, {dispatch, rejectWithValue}) => {
        dispatch(setPacksStatus('loading'))
        try {
            await packApi.createPack(param.name, param.isPrivate, param.deckCover)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })
export const deletePack = createAsyncThunk('packs/deletePack',
    async (param: { id: string }, {dispatch, rejectWithValue}) => {
        dispatch(setPacksStatus('loading'))
        try {
            await packApi.deletePack(param.id)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setPacksStatus('idle'))
        }
    })
export const updatePack = createAsyncThunk('packs/updatePack',
    async (param: { id: string, name: string, isPrivate: boolean, deckCover: string }, {dispatch, rejectWithValue}) => {
        dispatch(setPacksStatus('loading'))
        try {
            await packApi.updatePack(param.id, param.name, param.isPrivate, param.deckCover)
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        } finally {
            dispatch(setPacksStatus('idle'))
        }
    })


const packsSlice = createSlice({
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
            const initialState = packsSlice.getInitialState()
            state.packsSearchParams = initialState.packsSearchParams
        },
        setIsMyPacksFilter: (state, action: PayloadAction<string>) => {
            state.packsSearchParams.user_id = action.payload
            state.packsSearchParams.page = 1
        },
        changeStatusFirstLoading: (state) => {
            state.isFirstLoading = true
        },
        setPacksStatus: (state, action: PayloadAction<StatusType>) => {
            state.status = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPacks.fulfilled, (state, action) => {
                state.packs = action.payload
                if (state.isFirstLoading) {
                    state.packsSearchParams.min = action.payload.minCardsCount
                    state.packsSearchParams.max = action.payload.maxCardsCount
                    state.isFirstLoading = false
                }
            })
    }
})

export const {
    setPacksStatus,
    setIsMyPacksFilter,
    setPacksSearchParams,
    clearSearchParams,
    changeStatusFirstLoading
} = packsSlice.actions
export const packReducer = packsSlice.reducer