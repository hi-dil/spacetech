import { getAuth } from "firebase/auth";
import firebase_app from "../../../firebase";

const auth = getAuth(firebase_app);
export default function logOut() {
  auth.signOut();

}
