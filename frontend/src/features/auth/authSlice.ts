import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api";
import {SignInCredentials, User} from "../../api/types";
import {RootState} from "../../store";

type AuthState = {
    loginState: {
        pending: boolean,
        loggedUser: User,
        info: string
    }
}

const initialState: AuthState = {
    loginState: {
        pending: false,
        loggedUser: null,
        info: null
    }
}

// First, create the thunk
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: SignInCredentials) => {
        return api.authApi.signIn(payload)
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signIn.pending, (state) => {
            state.loginState = {
                pending: true,
                loggedUser: null,
                info: null
            }
        })
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            state.loginState.pending = false;
            state.loginState.loggedUser = payload.user;
            state.loginState = {
                pending: false,
                loggedUser: payload.user,
                info: 'User successfully logged in'
            }
        })
        builder.addCase(signIn.rejected, (state, {error}) => {
            state.loginState = {
                pending: false,
                loggedUser: null,
                info: error.message
            }
        })
    }
})

//export const {} = authSlice.actions;

export const selectIsLoginPending = (state: RootState) => state.auth.loginState.pending;
export const selectInfoMessage = (state: RootState) => state.auth.loginState.info;

export const authReducer = authSlice.reducer;