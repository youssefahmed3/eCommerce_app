"use server"

import mongoose from 'mongoose';
import { ProductType } from './product.model';
// import { createUser } from '@/lib/actions/user.action';


export interface CategoryType {
    id?: string;
    name: string;
    products?: mongoose.Schema.Types.ObjectId | ProductType[]
    createdAt?: Date;
    updatedAt?: Date;
}


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Consider using refPath for dynamic references if needed
        required: false
    }],
},
    { timestamps: true }
);


// Attach methods to UserSchema
// userSchema.methods.createUser = createUser;


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);


export default Category;