import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Function to handle user signup
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    return userCredential.user; // Returns the user object on success
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error; // Re-throw error for handling in the component
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    const token = await auth.currentUser.getIdToken();
    console.log(token);
    return userCredential.user; // Returns the user object on success
  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Re-throw error for handling in the component
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error; // Re-throw error for handling in the component
  }
};

// Function to listen for authentication state changes
export const listenToAuthState = (callback) => {
  try {
    // `callback` is a function that will receive the user object or `null`
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user);
        callback(user); // Pass user object to the callback
      } else {
        console.log("User is signed out");
        callback(null); // Pass null to the callback
      }
    });
  } catch (error) {
    console.error("Auth state listener error:", error.message);
    throw error; // Re-throw error for handling in the component
  }
};
