import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {profileApi} from '../../api/profileApi';

const initializeApp = createAsyncThunk('application/initializeApp', async (param, thunkAPI) => {
    try {
        await profileApi.me()
    } catch (e) {
        return thunkAPI.rejectWithValue({})
    }
})

export const asyncActions = {
    initializeApp
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false
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
    }
})
