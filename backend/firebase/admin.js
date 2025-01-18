const admin = require("firebase-admin");
// require("dotenv").config();
const serviceAccount = require("../firebase/admin-service-account.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://cutecharms-fc7cc-default-rtdb.asia-southeast1.firebasedatabase.app",
});

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   }),
//   databaseURL:
//     "https://cutecharms-fc7cc-default-rtdb.asia-southeast1.firebasedatabase.app",
// });

module.exports = admin;
