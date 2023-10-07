import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../../../firebase";

const db = getFirestore(firebase_app)
export default async function AddData(collection: string, id: string, data) {
  let result = null, error = null;
  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
