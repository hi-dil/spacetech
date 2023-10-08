import firebase_app from "../../../firebase";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function getData(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function getUserByEmail(email: string) {
  let result = null, error = null;

  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    result = querySnapshot.docs[0].data();
    result.id = querySnapshot.docs[0].id;
  }

  return { result, error };
}

export async function getProjectsByPagination(
  maxrows: number,
  startrowindex: number,
) {
  let result: ProjectType[] = [];
  let error = null;
  let q;

  if (startrowindex === 0) {
    q = query(
      collection(db, "projects"),
      orderBy("lastUpdateDate", "desc"),
      limit(maxrows),
    );
  } else {
    q = query(
      collection(db, "projects"),
      orderBy("lastUpdateDate", "desc"),
      limit(maxrows),
      startAfter(startrowindex),
    );
  }
  const querySnapshot = await getDocs(q);


  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const project = doc.data() as ProjectType;
      project.recId = doc.id;

      result.push(project);
    });
  }

  return { result, error };
}
