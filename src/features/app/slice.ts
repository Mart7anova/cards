import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {profileApi} from '../profile/api';
import {InfoType} from '../../common/types/InfoType';
import {setProfile} from "../profile/slice";
import {setIsLoggedIn} from "../auth/slice";


export const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch, rejectWithValue}) => {
    try {
        const {data} = await profileApi.me()
        dispatch(setProfile(data))
        dispatch(setIsLoggedIn(true))
    } catch (e) {
        return rejectWithValue(null)
    }
})

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        error: null as InfoType,
        success: null as InfoType,
    },
    reducers: {
        setAppError: (state, action) => {
            state.error = action.payload
        },
        setAppSuccess: (state, action) => {
            state.success = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(initializeApp.rejected, (state) => {
                state.isInitialized = true
            })
    }
})

export const {setAppSuccess, setAppError} = appSlice.actions
export const appReducer = appSlice.reducer