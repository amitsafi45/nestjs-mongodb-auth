import mongoose from "mongoose";

export const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true,
        alias:"expiry_date"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        alias:'user_id',
        require:true
    }
}, { timestamps: true });
