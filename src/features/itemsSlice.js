import { createSlice } from "@reduxjs/toolkit";
import { fetchItems as fetchItemsFromFirebase } from "../components/Firebase/firestoreService";

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        items: [],
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
});

export const { setItems } = itemsSlice.actions;

export const fetchItems = () => async (dispatch) => {
    try {
        const items = await fetchItemsFromFirebase();
        dispatch(setItems(items));
    } catch (error) {
        console.error("Error fetching items:", error.message);
    }
};

export default itemsSlice.reducer;
