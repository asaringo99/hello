import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    SerializedError,
} from '@reduxjs/toolkit';

enum Status {
    Idle = 'idle',
    Loading = 'loading',
    Succeeded = 'succeeded',
    Failed = 'failed',
}

interface LoginUser {
    name: string;
    password: string;
    email: string;
}

interface LoginUserState {
    user: LoginUser;
    status: Status;
    error?: string;
}

const initialLoginUser: LoginUser = {
    name: '',
    password: '',
    email: '',
};

const initialState: LoginUserState = {
    user: initialLoginUser,
    status: Status.Idle,
    error: undefined,
};

export const login = createAsyncThunk<
    LoginUser,
    LoginUser,
    { rejectValue: SerializedError }
>('user/login', async (loginUserData: LoginUser, { rejectWithValue }) => {
    const response = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'applicationi/json',
        },
        body: JSON.stringify(loginUserData),
    });

    if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
    }

    return (await response.json()) as LoginUser;
});

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.user.name = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.user.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = Status.Loading;
            console.log(action);
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = Status.Succeeded;
            console.log(action);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = Status.Failed;
            console.log(action);
        });
    },
});

export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
