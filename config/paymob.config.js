module.exports = {

    apiKey: process.env.PAYMOB_API_KEY,

    hmacSecret:
        process.env.PAYMOB_HMAC_SECRET,

    integrationIds: {

        card:
            process.env.PAYMOB_CARD_INTEGRATION_ID,

        wallet:
            process.env.PAYMOB_WALLET_INTEGRATION_ID,

        fawry:
            process.env.PAYMOB_FAWRY_INTEGRATION_ID

    },

    iframeId:
        process.env.PAYMOB_IFRAME_ID

};