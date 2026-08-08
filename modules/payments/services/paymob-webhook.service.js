const Payment = require("../models/payment.model");
const paymobHmacUtil = require("../../../shared/utils/paymob-hmac");
const AppError = require("../../../shared/utils/app_error");
const PaymentStatus = require("../../../shared/utils/payment_status");
const handleWebhook = async (req) => {

    const { hmac } = req.query;
    const data = req.body.obj;

    const isValid =
        paymobHmacUtil.verify(data, hmac);

    if (!isValid) {
        throw new AppError(
            "Invalid Paymob HMAC",
            400
        );
    }

    const payment =
        await Payment.findOne({
            providerTransactionId: data.id
        });

    if (!payment) {
        throw new AppError(
            "Payment not found",
            404
        );
    }

    if (data.success === true) {

        payment.status = "paid";
        payment.paidAt = new Date();

        await payment.save();

        // update appointment
    }

    return payment;
};