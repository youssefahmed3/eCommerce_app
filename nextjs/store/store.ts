import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./users/UsersSlice";
import { productsReducer } from "./products/productsSlice";
import { ordersReducer } from "./orders/ordersSlice";
import { categoriesReducer } from "./categories/categoriesSlice";
export const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productsReducer,
        orders: ordersReducer,
        categories: categoriesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>; // to get all the states in the store by using this type

export type AppDispatch = typeof store.dispatch; // for async actions

