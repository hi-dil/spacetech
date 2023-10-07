import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import firebase_app from "../../../firebase";

const auth = getAuth(firebase_app);


export async function signInWithEmail(email: string, password: string) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signInWithGoogle() {
  let result = null, error = null;
  try {
    const provider = new GoogleAuthProvider();
    result = await signInWithPopup(auth, provider);
  } catch (err) {
    error = err;
  }

  return { result, error };
}

export async function signInWithGithub() {
  let result = null, error = null;

  try {
    const provider = new GithubAuthProvider();
    result = await signInWithPopup(auth, provider);
  } catch (err){
    error = err
  }
  return { result, error };
}
