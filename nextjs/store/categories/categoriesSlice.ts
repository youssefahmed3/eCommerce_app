import { fetchAllCategories } from "@/lib/actions/category.action";
import { fetchAllOrders } from "@/lib/actions/order.action";
import { fetchAllProducts } from "@/lib/actions/product.action";
import { CategoryType } from "@/lib/models/category.model";
import { OrderType } from "@/lib/models/order.model";
import { ProductType } from "@/lib/models/product.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk('categories/fetchAllCategories', async () => {
    const categories = await fetchAllCategories();
    return categories;
});

const initialState: CategoryType[] = [];

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
            return action.payload;
            // Update the state with the fetched products
        });
    }
});

// export const { setUser } = ProductsSlice.actions;



export const categoriesReducer = categoriesSlice.reducer;