const authenticate = async () => {

    const response = await fetch(
        `${PAYMOB_BASE_URL}/api/auth/tokens`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                api_key: API_KEY
            })
        }
    );

    const data = await response.json();

    return data.token;
};
const createOrder = async ({
    authToken,
    amount
}) => {

    const response = await fetch(
        `${PAYMOB_BASE_URL}/api/ecommerce/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                auth_token: authToken,
                delivery_needed: false,
                amount_cents: amount * 100,
                currency: "EGP",
                items: []
            })
        }
    );

    return response.json();
};
const generatePaymentKey = async ({
    authToken,
    amount,
    orderId,
    integrationId,
    billingData
}) => {

    // Paymob API

};