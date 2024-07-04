import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface user {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}


const initialState: user = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<user>) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
    },
});

export const { setUser } = userSlice.actions;



export const userReducer = userSlice.reducer;