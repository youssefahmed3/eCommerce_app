"use server"
import connectToDb from "@/lib/mongodb";
import { ProductType } from "../models/product.model";
import Product from "../models/product.model";
import Category from "../models/category.model";
import Order from "../models/order.model";


// Create Product object

export async function createProduct(productData: ProductType) {

    try {
        await connectToDb();
        // console.log(Product);

        const new_product = await Product.create({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.imagePath,
            filePath: productData.filePath,
            imagePath: productData.imagePath,
            isAvaliableForPurchase: productData.isAvaliableForPurchase,
            category: productData.category,
            rating: productData.rating,
        });
        console.log(new_product);
        return new_product.toObject();

    } catch (error: any) {
        console.log(error.message);
        throw error; // Rethrow the error for the caller to handle

    }
};

export async function fetchAllProducts() {
    try {
        await connectToDb();
        const products = await Product.find().lean();
       
        return products.map(product => {
            product.id = product._id.toString();
            product.createdAt = product.createdAt.toLocaleString();
            product.updatedAt = product.updatedAt.toLocaleString();
            return product;
        });
    }


    catch (error: any) {
        console.log(error.message);
    }
}

export async function updateProductById(id: string, product: ProductType) {
    try {
        await connectToDb();
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            $set: {
                ...product
            },
        }, { new: true });
        if (updatedProduct) {
            return updatedProduct.toObject();
        }
        return null;
    } catch (error: any) {
        console.error('Error updating Product by id:', error instanceof Error? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}


export async function getProductById(id: string): Promise<ProductType | null> {
    try {
        await connectToDb();
        const product: any = await Product.findById(id).lean();
        if (product) {
            const transformedProduct: ProductType = {
                id: product._id.toString(),
                name: product.name,
                description: product.description,
                price: product.price,
                imagePath: product.imagePath,
                filePath: product.filePath,
                rating: product.rating,
                isAvaliableForPurchase: product.isAvaliableForPurchase,
                category: product.category,
                createdAt: product.createdAt.toLocaleString(),
                updatedAt: product.updatedAt.toLocaleString(),
            };

            console.log(transformedProduct);
            
            return transformedProduct;
        }
        return null;
    } catch (error: unknown) {
        console.error('Error fetching Product by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}



export async function deleteProductById(id: string) {
    try {
        await connectToDb();
        const product = await Product.findByIdAndDelete(id);
        
        await Category.updateMany(
            { products: id },
            { $pull: { products: id } }
        );

       /*  await Order.updateMany(
            { products: id },
            { $pull: { products: id } }
        ); */
        return 'deleted';
    } catch (error: unknown) {
        console.error('Error deleting Product by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}