import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const rawDbUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL;
let sanitizedDbUrl = rawDbUrl;

if (rawDbUrl && rawDbUrl.includes("console.firebase.google.com")) {
  // If user accidentally pasted the console URL, try to extract the project ID
  const match = rawDbUrl.match(/project\/([^\/]+)\/database\/([^\/]+)/);
  if (match) {
    sanitizedDbUrl = `https://${match[2]}.firebaseio.com`;
  }
} else if (rawDbUrl) {
  // Ensure it doesn't have trailing paths like /data/
  try {
    const url = new URL(rawDbUrl);
    sanitizedDbUrl = `${url.protocol}//${url.host}`;
  } catch (e) {
    console.error("Invalid Database URL format");
  }
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: sanitizedDbUrl
};

// Check if we have at least the minimum required config
const isFirebaseConfigured = !!firebaseConfig.apiKey;

let app;
let auth: any;
let db: any = null;
let analytics: any = null;
let googleProvider: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    if (firebaseConfig.databaseURL) {
      db = getDatabase(app);
    }
    googleProvider = new GoogleAuthProvider();
    
    auth.useDeviceLanguage();

    if (typeof window !== "undefined" && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth, db, analytics, googleProvider, isFirebaseConfigured };

export const loginWithGoogle = async () => {
  if (!isFirebaseConfigured || !auth) {
    const msg = "Firebase is not configured correctly. Please check your environment variables in AI Studio Settings.";
    console.error(msg);
    alert(msg);
    return;
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error: any) {
    console.error("Login Error:", error);
    
    if (error.code === 'auth/unauthorized-domain') {
      alert("This domain is not authorized in your Firebase console. Please add " + window.location.hostname + " to the Authorized Domains list in Firebase Authentication settings.");
    } else if (error.code === 'auth/popup-blocked') {
      alert("Login popup was blocked by your browser. Please allow popups for this site.");
    } else {
      alert("Login failed: " + error.message);
    }
    throw error;
  }
};

export const logout = async () => {
  if (auth) return signOut(auth);
};
