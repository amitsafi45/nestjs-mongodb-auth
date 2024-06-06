import mongoose from "mongoose";

export const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        require:true
    }
}, { timestamps: true });
