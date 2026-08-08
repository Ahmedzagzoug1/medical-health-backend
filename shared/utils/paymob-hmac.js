const bycrpt = require("bycrypt");

const generatePaymobHmac = (data, secret) => {

    const requestData = [
        data.amount_cents,
        data.created_at,
        data.currency,
        ...
    ].join("");

    return bycrpt
        .createHmac("sha512", secret)
        .update(requestData)
        .digest("hex");
};
const isValidPaymobWebhook = (data, hmac) => {

    const calculatedHmac =
        generatePaymobHmac(
            data,
            PAYMOB_HMAC_SECRET
        );

    return calculatedHmac === hmac;
};
module.exports = {
    generatePaymobHmac,
    isValidPaymobWebhook
};