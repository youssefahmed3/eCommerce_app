import { fetchAllProducts, getProductById } from "@/lib/actions/product.action";
import { ProductType } from "@/lib/models/product.model";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk('products/fetchAllProducts', async () => {
    const products = await fetchAllProducts();
    return products;
});

export const fetchProductById = createAsyncThunk('products/fetchProductDetailsById', async (id: string) => {
    const products = await getProductById(id);
    return products;
});


const initialState: ProductType[] = [];

const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
            return action.payload;
            // Update the state with the fetched products
        });

        builder.addCase(fetchProductById.fulfilled, (state, action: PayloadAction<ProductType>) => {
            return action.payload;
            // Update the state with the fetched products
        })
    }
});

// export const { setUser } = ProductsSlice.actions;



export const productsReducer = ProductsSlice.reducer;