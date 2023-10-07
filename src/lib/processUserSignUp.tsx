import SetLocalStorage from "@/lib/SetLocalStorage";
import AddData from "@/lib/firebase/AddData";
import getData from "@/lib/firebase/getData";
import { UserCredential } from "firebase/auth";

export default async function processUserSignUp (email: string, provider: string, result: UserCredential) {
  const docsnap = await getData("user", email);


  if (docsnap.error) {
    return
  }

  const defaultImageURL =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  if (!docsnap.result?.exists()) {
    let userData: FirebaseUser = {
      email: "",
      displayName: "",
      imageURL: defaultImageURL,
      createDate: new Date(),
      lastAccessDate: new Date(),
      tags: [],
      privacy: false,
      extdata: {},
      provider: provider,
      completeProfile: false,
    };

    if (provider === "email") {
      userData.email = email;
    } else {
      userData.email = result.user.email ? result.user.email : "";
      userData.displayName = result.user.displayName
        ? result.user.displayName
        : "";
      userData.imageURL = result.user.photoURL
        ? result.user.photoURL
        : defaultImageURL;
    }

    const addUser = await AddData(userData.email, userData);
    if (addUser.error) {
      console.log(addUser.error);
      throw new Error("There's an error adding your data");
    }

    // store some user data in local storage
    SetLocalStorage(userData.email, userData.displayName, userData.imageURL);

    return;
  }

  const userData = docsnap.result.data();

  // store some user data in local storage
  SetLocalStorage(userData.email, userData.displayName, userData.imageURL);
}
