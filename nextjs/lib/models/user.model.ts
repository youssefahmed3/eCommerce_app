"use server"

import mongoose from 'mongoose';
// import { createUser } from '@/lib/actions/user.action';

export interface UserType {
    id?: string;
    name: {
        firstName: string;
        lastName: string;
    };
    username: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    orders: mongoose.Schema.Types.ObjectId[],
    billingMethod: string[];
    createdAt?: Date;
    updatedAt?: Date;
}


const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false,
    }],
    billingMethod: {
        type: [String],
        required: false,
        unique: false
    }

},
    { timestamps: true }
);


// Attach methods to UserSchema
// userSchema.methods.createUser = createUser;


const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;