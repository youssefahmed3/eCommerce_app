"use server"

import Category, { CategoryType } from "../models/category.model";
import Product, { ProductType } from "../models/product.model";
import connectToDb from "../mongodb";
import { getProductById } from "./product.action";

export async function createCategory(categoryData: CategoryType) {

    try {
        await connectToDb();
        console.log(Category);

        const new_category = await Category.create({
            name: categoryData.name,
            products: categoryData.products,
        });
        console.log(new_category);

    } catch (error: any) {
        console.log(error.message);

    }
}



export async function fetchAllCategories() {
    try {
        await connectToDb();
        const categories = await Category.find().lean();

        // Resolving all promises and ensuring serializable values
        const resolvedCategories = await Promise.all(categories.map(async category => {
            category.id = category._id.toString();
            category.createdAt = category.createdAt.toLocaleString();
            category.updatedAt = category.updatedAt.toLocaleString();

            // Fetching product details for each product ID in the products array
            category.products = await Promise.all(category.products.map(async (productItem: any) => {
                const product = await getProductById(productItem) as unknown as ProductType;
                // Ensure that the product details are structured as needed here
                // Assuming `getProductById` returns the full product details as needed
                return {
                    ...productItem,
                    product: product ? {
                        id: product.id,
                        name: product.name, // Assuming there's a 'name' field in product
                        description: product.description, // Assuming there's a 'description' field in product
                        imagePath: product.imagePath, // Assuming there's an 'imagePath' field in product
                        filePath: product.filePath, // Assuming there's an 'filePath' field in product
                        rating: product.rating, // Assuming there's a 'rating' field in product
                        isAvaliableForPurchase: product.isAvaliableForPurchase, // Assuming there's an 'isAvaliableForPurchase' field in product
                        category: product.category.toString(), // Assuming there's a 'category' field in product
                        price: product.price, // Assuming there's a 'price' field in product
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt
                        // Add other product fields as needed
                    } : null
                };
            }));
            return category;
        }));

        return resolvedCategories;

    } catch (error: any) {
        console.log(error.message);
    }
}

export async function getCategoryById(id: string) {
    try {
        await connectToDb();
        const category = await Category.findById(id).lean();
        if (category) {
            category.id = category._id.toString();
            category.createdAt = category.createdAt.toLocaleString();
            category.updatedAt = category.updatedAt.toLocaleString();
            return category;
        }
        return null;
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function updateCategoryName(id: string, categoryName: CategoryType) {
    try {
        await connectToDb();
        const category = await Category.findByIdAndUpdate(id, categoryName, { new: true });
        if (category) {
            category.id = category._id.toString();
            category.createdAt = category.createdAt.toLocaleString();
            category.updatedAt = category.updatedAt.toLocaleString();
            return category;
        }
        return null;

    } catch (error: any) {
        console.log(error.message);

    }
}

export async function deleteCategory(id: string) {
    try {
        await connectToDb();
        // Find and delete all products associated with the category
        await Product.deleteMany({ category: id });
        // Then delete the category itself
        const category = await Category.findByIdAndDelete(id);
        return category ? category.lean() : null;
    } catch (error: any) {
        console.log(error.message);
        throw error; // Consider rethrowing the error or handling it as needed
    }
}



export async function addProductToCategory({ categoryId, productId }: { categoryId: string, productId: string }) {
    try {
        await connectToDb();
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $addToSet: { products: productId } },
            { new: true }
        ).lean();
        if (updatedCategory) {
            updatedCategory.id = updatedCategory._id.toString();
            updatedCategory.createdAt = updatedCategory.createdAt.toLocaleString();
            updatedCategory.updatedAt = updatedCategory.updatedAt.toLocaleString();
            return updatedCategory;
        }
        return null;
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}


export async function removeProductFromCategory({ categoryId, productId } : {categoryId: string, productId: string}) {
    try {
      await connectToDb();
      const category = await Category.findById(categoryId);
      if (category) {
        category.products = category.products.filter(p => p.toString() !== productId);
        await category.save();
      }
    } catch (error) {
      console.error('Error removing product from category:', error);
      throw error;
    }
  }