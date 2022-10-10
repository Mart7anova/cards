import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ProfileResponseType} from '../../common/types/profileType';
import {profileApi} from '../../api/profileApi';
import {StatusType} from '../../common/types/statusType';
import {handleNetworkError} from '../../common/utils/handleNetworkError';

const setProfile = createAsyncThunk('profile/setProfile',
    async (param, {rejectWithValue, dispatch}) => {
    try {
        const {data} = await profileApi.me()
        return data
    } catch (e) {
        handleNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const updateProfile = createAsyncThunk('profile/updateProfile',
    async (param: { name?: string, avatar?: string }, thunkAPI) => {
    try {
        const {data} = await profileApi.updateUser(param.name, param.avatar)
        return data.updatedUser
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})

export const asyncActions = {
    setProfile,
    updateProfile
}

export const slice = createSlice({
    name: 'app',
    initialState: {
        profile: {} as ProfileResponseType,
        status: 'idle' as StatusType,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(setProfile.fulfilled, (state, actions) => {
                state.profile = actions.payload
                state.status = 'idle'
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profile = action.payload
            })
    }
})

