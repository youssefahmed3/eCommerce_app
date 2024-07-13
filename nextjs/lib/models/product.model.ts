"use server"
import mongoose from 'mongoose';

export interface ProductType {
    id?: string;
    name: string,
    description: string,
    price: number,
    imagePath: string,
    filePath: string,
    rating: number,
    isAvaliableForPurchase: boolean,
    category: string
    createdAt?: Date,
    updatedAt?: Date,
}


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    price: {
        type: Number,
        required: true,
        min: 0.01
    },
    filePath: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    imagePath: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' // Assuming 'Category' is the name of your category model
    },
    isAvaliableForPurchase: {
        type: Boolean,
        required: true,
        default: true,
    }
},
    { timestamps: true }
);


// Attach methods to UserSchema
// userSchema.methods.createUser = createUser;


const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


export default Product;