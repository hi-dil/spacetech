export default function SetLocalStorage(email: string, displayName: string, imageURL: string) {
  localStorage.setItem("email", email);
  localStorage.setItem("displayName", displayName);
  localStorage.setItem("imageURL", imageURL);
}
