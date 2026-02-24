import { createSlice } from "@reduxjs/toolkit";

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        list: savedOrders,
    },
    reducers: {
        addOrder: (state, action) => {
            state.list.unshift(action.payload); // plus récent en premier
            localStorage.setItem("orders", JSON.stringify(state.list));
        },
        clearOrders: (state) => {
            state.list = [];
            localStorage.removeItem("orders");
        },
        cancelOrder: (state, action) => {
            const order = state.list.find((o) => (o.orderId || o.id) === action.payload);
            if (order) {
                order.status = "Annulée";
                localStorage.setItem("orders", JSON.stringify(state.list));
            }
        },
    },
});

export const { addOrder, clearOrders, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
