import { fetchAllOrders } from "@/lib/actions/order.action";
import { fetchAllProducts } from "@/lib/actions/product.action";
import { OrderType } from "@/lib/models/order.model";
import { ProductType } from "@/lib/models/product.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const fetchOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
    const orders = await fetchAllOrders();
    return orders;
});

const initialState: OrderType[] = [];

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderType[]>) => {
            return action.payload;
            // Update the state with the fetched products
        });
    }
});

// export const { setUser } = ProductsSlice.actions;



export const ordersReducer = ordersSlice.reducer;