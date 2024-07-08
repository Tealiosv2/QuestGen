import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { success: true, user: userCredential, message: "User logged in" };
    })
    .catch((err) => {
      console.log(err);
      return {
        success: false,
        user: null,
        message: err.code,
      };
    });
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { success: true, user: userCredential, message: "User logged in" };
    })
    .catch((err) => {
      if (err.code === "auth/invalid-email") {
        return {
          success: false,
          user: null,
          message: err.code,
        };
      }
    });
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
