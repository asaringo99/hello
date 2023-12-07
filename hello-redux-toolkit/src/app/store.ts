import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counter.slice';
import loginReducer from './slice/user.slice';
import signupReducer from './slice/signup.slice';

const store = configureStore({
    reducer: {
        counter: counterReducer,
        login: loginReducer,
        signup: signupReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
