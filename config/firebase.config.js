const admin = require("firebase-admin");
const serviceAccount = require("../medical-health-23ea1-firebase-adminsdk-fbsvc-6d2600b34a.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;