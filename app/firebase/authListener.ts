import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

export const authStateListener = (callback: (user) => void) => {
    return onAuthStateChanged(auth, callback);
};