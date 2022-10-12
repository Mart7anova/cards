import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {packApi, PackSearchParamsType, PackType, ResponseCardPacksType} from '../../api/packApi';
import {handleNetworkError} from '../../common/utils/handleNetworkError';
import {AppRootStateType} from '../../app/store';
import {StatusType} from '../../common/types/statusType';

const fetchPacks = createAsyncThunk('packs/fetchPacks',
    async (param, {dispatch, getState, rejectWithValue}) => {
        try {
            const state = getState() as AppRootStateType
            const searchParams = state.pack.searchParams

            const {data} = await packApi.getPacks(searchParams)
            return data
        } catch (e) {
            handleNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const createNewPack = createAsyncThunk('packs/createNewPack',
    async (param: { name: string, isPrivate: boolean }, {dispatch, rejectWithValue}) => {
        try {
            await packApi.createPack(param.name, param.isPrivate)
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
    async (param: { id: string, name: string, isPrivate: boolean }, {dispatch, rejectWithValue}) => {
        try {
            await packApi.updatePack(param.id, param.name, param.isPrivate)
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
        searchParams: {
            page: 1,
            pageCount: 10,
            packName: '',
        } as PackSearchParamsType,
        isFirstLoading: true,
        status: 'idle' as StatusType
    },
    reducers: {
        setSearchParams: (state, action: PayloadAction<PackSearchParamsType>) => {
            state.searchParams = {...state.searchParams, ...action.payload}
        },
        clearSearchParams: (state) => {
            const initialState = slice.getInitialState()
            state.searchParams = initialState.searchParams
            state.searchParams.min = state.packs.minCardsCount
            state.searchParams.max = state.packs.maxCardsCount
        },
        setIsMyPacksFilter: (state, action: PayloadAction<string>) => {
            state.searchParams.user_id = action.payload
            state.searchParams.page = 1
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
                    state.searchParams.min = action.payload.minCardsCount
                    state.searchParams.max = action.payload.maxCardsCount
                    state.isFirstLoading = false
                }
                state.status = 'idle'
            })

            .addCase(createNewPack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createNewPack.fulfilled, (state) => {
                state.status = 'idle'
            })

            .addCase(deletePack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deletePack.fulfilled, (state) => {
                state.status = 'idle'
            })

            .addCase(updatePack.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updatePack.fulfilled, (state) => {
                state.status = 'idle'
            })
    }
})
