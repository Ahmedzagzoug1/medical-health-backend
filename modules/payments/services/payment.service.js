const createPayment = async (paymentData) => {

    const {
        amount,
        email,
        paymentType
    } = paymentData;

    const integrationId =
        INTEGRATION_IDS[paymentType];

    const authToken =
        await paymobService.authenticate();

    const order =
        await paymobService.createOrder({
            authToken,
            amount
        });

    const paymentKey =
        await paymobService.generatePaymentKey({
            authToken,
            amount,
            orderId: order.id,
            integrationId,
            billingData: paymentData
        });

    return buildPaymentResponse({
        paymentKey,
        orderId: order.id,
        paymentType
    });
};