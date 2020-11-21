import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api";
import {SignInPayload} from "../../api/types";


type AuthState = {
    user: any
}

const initialState: AuthState = {
    user: null
}

// First, create the thunk
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: SignInPayload) => {
        console.warn('api call')
        return api.authApi.signIn(payload)
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [signIn.pending.toString()]: (state, action) => {
            console.warn('pending', {action})
        },
        [signIn.fulfilled.toString()]: (state, action) => {
            console.warn('fulfilled', {action})
        }
    }
})

//export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;