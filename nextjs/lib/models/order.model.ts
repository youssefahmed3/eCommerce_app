"use server"
import mongoose from 'mongoose';
import { UserType } from './user.model';
import { ProductType } from './product.model';

interface ProductItem {
  product: ProductType;
  quantity: number;
}

export interface OrderType {
  id?: string;
  user: UserType | string;
  products: ProductItem[];
  totalPrice: number;
  status: string;
  paymentMethod?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Consider using refPath for dynamic references if needed
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // Ensure quantity is at least 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [ProductItemSchema],
  totalPrice: Number,
  status: { type: String, default: 'pending' },
  paymentMethod: {
    type: String,
    default: 'null'
  },
},
  { timestamps: true }
);


// Attach methods to UserSchema
// userSchema.methods.createUser = createUser;


const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);


export default Order;