import mongoose from "mongoose"

const paymentSchema = mongoose.Schema({
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_signature: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const payment = mongoose.model("Payment",paymentSchema);
export default payment;