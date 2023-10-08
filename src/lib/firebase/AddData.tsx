import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../../../firebase";
import { v4 as uid } from 'uuid';

const db = getFirestore(firebase_app)
export async function AddUserData(data: FirebaseUser) {
  let result = null, error = null;
  const id = uid();
  data.userId = id

  try {
    result = await setDoc(doc(db, 'user', id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function AddProjectData(id: string, data: ProjectType) {
  let result = null, error = null;

  try {
    result = await setDoc(doc(db, 'projects', id), data, {
      merge: true
    })
  } catch(e) {
    error = e
  }

  return {result, error}
}
