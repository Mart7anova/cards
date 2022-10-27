import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {profileApi} from '../../api/profileApi';
import {infoType} from '../../common/types/infoType';
import {appActions} from './index';
import {profileActions} from '../profile';
import {authActions} from '../auth';

const {setProfile} = profileActions
const {setIsLoggedIn} = authActions

const initializeApp = createAsyncThunk('app/initializeApp', async (param, {dispatch,rejectWithValue}) => {
    try {
        const {data} = await profileApi.me()
        dispatch(setProfile(data))
        dispatch(setIsLoggedIn(true))
    } catch (e) {
        return rejectWithValue(null)
    }
})

export const asyncActions = {
    initializeApp
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        error: null as infoType,
        success: null as infoType,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(initializeApp.rejected, (state) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload
            })
            .addCase(appActions.setAppSuccess, (state, action) => {
                state.success = action.payload
            })
    }
})
