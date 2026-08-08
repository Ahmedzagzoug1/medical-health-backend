const mongoose = require("mongoose");
const PaymentStatus = require("../../../shared/utils/payment_status");
const PaymentMethods = require("../../../shared/utils/payment_method");
const paymentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        default: "EGP"
    },

    paymentMethod: {
        type: String,
        enum:PaymentMethods,
        required: true
    },

    status: {
        type: String,
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    },

    provider: {
        type: String,
        default: "paymob"
    },

    providerOrderId: String,

    providerTransactionId: String,

    paidAt: Date,

    failureReason: String

}, {
    timestamps: true
});