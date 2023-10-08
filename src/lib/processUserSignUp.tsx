import SetLocalStorage from "@/lib/SetLocalStorage";
import { getUserByEmail } from "@/lib/firebase/getData";
import { UserCredential } from "firebase/auth";
import { AddUserData } from "./firebase/AddData";

export default async function processUserSignUp(
  email: string,
  provider: string,
  result: UserCredential,
  displayName: string
) {
  if (provider !== "email"){
    email = result.user.email ? result.user.email : ""
  }

  const getUserData = await getUserByEmail(email);

  const defaultImageURL =
    "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  if (getUserData.error || !getUserData.result || getUserData === null) {
    let userData: FirebaseUser = {
      userId: "",
      email: "",
      displayName: displayName,
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

    const addUser = await AddUserData(userData);
    if (addUser.error) {
      console.log(addUser.error);
      throw new Error("There's an error adding your data");
    }

    // store some user data in local storage
    SetLocalStorage(userData.email, userData.displayName, userData.imageURL, userData.userId);

    return;
  }

  const userData = getUserData.result

  // store some user data in local storage
  SetLocalStorage(userData.email, userData.displayName, userData.imageURL, userData.userId);
}
