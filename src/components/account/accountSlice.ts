import {User} from "../../models/user";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import {FieldValues} from "react-hook-form";
import {toast} from "react-toastify";
import {setBasket} from "../basket/basketSlice";

interface AccountState {
    user: User | null
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        console.log(data)
        try {
            const userDto = await agent.Account.login(data);
            const {basket,...user} = userDto;
            if(basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error :error.data})
        }
    }
)

export const getCurrentUser = createAsyncThunk<User>(
    'account/getCurrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await agent.Account.currentUser();
            const {basket,...user} = userDto;
            if(basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem('user',JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error :error.data})
        }
    }, {
        condition: () => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut : (state) => {
            state.user = null;
                localStorage.removeItem('user');

        },
        setUser : (state,action) => {
            state.user = action.payload;
        }
    },
    extraReducers : (builder => {
        builder.addCase(getCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled,getCurrentUser.fulfilled),(state,action) => {
            state.user = action.payload;
        })
        builder.addMatcher(isAnyOf(signInUser.rejected),(state,action) => {
            throw action.payload;
        })
    })
})

export const {signOut,setUser} = accountSlice.actions;