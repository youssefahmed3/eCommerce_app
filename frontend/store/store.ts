import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/CounterSlice";
import { userReducer } from "./user/UserSlice";
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>; // to get all the states in the store by using this type

export type AppDispatch = typeof store.dispatch; // for async actions

