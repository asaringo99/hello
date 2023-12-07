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

interface SignupUser {
    name: string;
    password: string;
    email: string;
}

interface SignupUserState {
    user: SignupUser;
    status: Status;
    error?: string;
}

const initialSignupUser: SignupUser = {
    name: '',
    password: '',
    email: '',
};

const initialState: SignupUserState = {
    user: initialSignupUser,
    status: Status.Idle,
    error: undefined,
};

export const signup = createAsyncThunk<
    SignupUser,
    SignupUser,
    { rejectValue: SerializedError }
>('user/signup', async (signupUserData: SignupUser, { rejectWithValue }) => {
    const response = await fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'applicationi/json',
        },
        body: JSON.stringify(signupUserData),
    });

    if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
    }

    return (await response.json()) as SignupUser;
});

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.user.name = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.user.password = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.user.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.status = Status.Loading;
            console.log(action);
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.status = Status.Succeeded;
            console.log(action);
        });
        builder.addCase(signup.rejected, (state, action) => {
            state.status = Status.Failed;
            console.log(action);
        });
    },
});

export const { setUsername, setPassword, setEmail } = signupSlice.actions;

export default signupSlice.reducer;
