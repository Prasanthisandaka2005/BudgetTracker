import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.name = '';
            state.email = '';
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
