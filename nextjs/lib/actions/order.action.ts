"use server"
import Order, { OrderType } from "../models/order.model";
import Product, { ProductType } from "../models/product.model";
import connectToDb from "../mongodb";
import { getProductById } from "./product.action";
import { getUserById } from "./user.action";


export async function createOrder(userOrder: OrderType) {
    console.log(userOrder);

    
    let totalPrice = 0;
    for (const productItem of userOrder.products) {
        const product = await getProductById(productItem.product.toString());
        totalPrice += product!.price * productItem.quantity; // Assuming `price` is a field in your ProductType
    }

    try {
        await connectToDb();
        const order = await Order.create({
            user: userOrder.user,
            products: userOrder.products,
            totalPrice: totalPrice,
            status: userOrder.status,
            paymentMethod: userOrder.paymentMethod,
        });
        console.log(order);
        
    } catch (error: unknown) {
        console.error('Error fetching user by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}


export async function fetchAllOrders() {
    try {
        await connectToDb();
        const orders = await Order.find().lean();
        const ordersWithUserDetails = await Promise.all(orders.map(async (order: any) => {
            order.id = order._id.toString();
            order.user = await getUserById(order.user);
            order.createdAt = order.createdAt.toLocaleString();
            order.updatedAt = order.updatedAt.toLocaleString();
            order.products = await Promise.all(order.products.map(async (productItem:any) => {
                productItem.product = await getProductById(productItem.product)
                return productItem
            }));
            return order;
        }));
        
        return ordersWithUserDetails;
        
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function deleteOrderById(id: string) {
    try {
        await connectToDb();
        const order = await Order.findByIdAndDelete(id);
        return order.lean();
    } catch (error: any) {
        console.log(error.message);
    }
}


export async function getOrderById(id: string): Promise<OrderType | null> {
    try {
        await connectToDb();
        const order: any = await Order.findById(id).lean();  // Use lean() to get plain JavaScript object

        if (order) {
            const transformedProducts = await Promise.all(order.products.map(async (productItem: any) => {
                const product = await getProductById(productItem.product);
                return {
                    ...productItem,
                    product: product ? { ...product } : null  // Ensure product is converted to plain object
                };
            }));

            const transformedOrder: OrderType = {
                id: order._id.toString(),
                user: order.user.toString(),
                status: order.status,
                totalPrice: order.totalPrice,
                paymentMethod: order.paymentMethod,
                products: transformedProducts,
                createdAt: order.createdAt.toLocaleString(),
                updatedAt: order.updatedAt.toLocaleString(),
            };

            return transformedOrder;
        }

        return null;
    } catch (error: any) {
        console.error('Error fetching Order by id:', error instanceof Error ? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}

export async function updateOrderStatusById(id: string) {
    try {
        await connectToDb();
        const order = await Order.findByIdAndUpdate(id, { status: 'Delivered' }, { new: true }).lean();
        return order;
    } catch (error: any) {
        console.error('Error updating Order status by id:', error instanceof Error? error.message : error);
        throw error; // Rethrow or handle as needed
    }
}