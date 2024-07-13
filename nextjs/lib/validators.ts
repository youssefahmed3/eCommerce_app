import { z } from "zod"
 
export const productFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(10).max(255),
    price: z.string().min(1),
    category: z.string(),
    imagePath: z.string(),
    filePath: z.string(),
    isAvaliableForPurchase: z.boolean(),
})



export const orderFormSchema = z.object({
    email: z.string(),
    products: z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
    })),
    totalPrice: z.number(),
    status: z.string(),
    paymentMethod: z.string(),
})

export const categoryFormSchema = z.object({
    name: z.string().min(2).max(100),
})