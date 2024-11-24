import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// Import service account key JSON
const serviceAccount = require("../secrets/web-app-testcode-firebase-adminsdk-mkg84-0be6d56ad3.json");

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Ambil dari .env atau ganti URL langsung
  });
} else {
  admin.app(); // Gunakan aplikasi yang sudah ada
}

// Export Firebase Realtime Database reference
const db = admin.database();

// Ekspor db agar dapat digunakan di file lain
export { db };
