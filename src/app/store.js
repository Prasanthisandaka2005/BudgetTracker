import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import itemsReducer from '../features/itemsSlice';
import otherCostsReducer from '../features/otherCostsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        items: itemsReducer,
        otherCosts: otherCostsReducer,
    },
});
