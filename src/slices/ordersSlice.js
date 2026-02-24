import { createSlice } from "@reduxjs/toolkit";

/* Load from localStorage */
let savedOrders = [];
try {
    savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
} catch (e) {
    localStorage.removeItem("orders");
}

const initialState = {
    list: savedOrders,
};

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const order = {
                ...action.payload,
                id: Date.now().toString(),
                date: new Date().toISOString(),
                status: "En cours",
            };
            state.list.unshift(order);
            localStorage.setItem("orders", JSON.stringify(state.list));
        },
        clearOrders: (state) => {
            state.list = [];
            localStorage.removeItem("orders");
        },
    },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
