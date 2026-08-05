const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT || 3000,
    dbUri: process.env.DB_CONNECTION,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
NODE_ENV:process.env.NODE_ENV,
//
 API_KEY : process.env.API_KEY,
  CARD: process.env.CARD_INTEGRATION_ID,
  WALLET: process.env.WALLET_INTEGRATION_ID,
  KIOSK: process.env.KIOSK_INTEGRATION_ID,

 IFRAME_ID : process.env.IFRAME_ID,
 PAYMOB_HMAC_SECRET : process.env.PAYMOB_HMAC_SECRET
};