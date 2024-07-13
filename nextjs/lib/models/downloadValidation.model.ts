"use server"
import mongoose from 'mongoose';


export interface DownloadValidationType {
    
    product: mongoose.Schema.Types.ObjectId;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}


const downloadValidationSchema = new mongoose.Schema({
    products: mongoose.Schema.Types.ObjectId,
    expiresAt: Date,
},
    { timestamps: true }
);


// Attach methods to UserSchema
// userSchema.methods.createUser = createUser;


const DownloadValidation = mongoose.models.DownloadValidation || mongoose.model('DownloadValidation', downloadValidationSchema);


export default DownloadValidation;