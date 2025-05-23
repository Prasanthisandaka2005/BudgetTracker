import { createSlice } from "@reduxjs/toolkit";
import { fetchOtherCosts as fetchOtherCostsFromFirebase } from "../components/Firebase/firestoreService";

const otherCostsSlice = createSlice({
    name: "otherCosts",
    initialState: {
        otherCosts: [],
    },
    reducers: {
        setOtherCosts(state, action) {
            state.otherCosts = action.payload;
        },
    },
});

export const { setOtherCosts } = otherCostsSlice.actions;

export const fetchOtherCosts = () => async (dispatch) => {
    try {
        const otherCosts = await fetchOtherCostsFromFirebase();
        dispatch(setOtherCosts(otherCosts));
    } catch (error) {
        console.error("Error fetching other costs:", error.message);
    }
};

export default otherCostsSlice.reducer;
