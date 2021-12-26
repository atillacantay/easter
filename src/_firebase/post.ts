import { db } from "./init";
import { collection, doc, setDoc } from "firebase/firestore";

export const create = async (postData: any) => {
  const newPostRef = doc(collection(db, "posts"));
  await setDoc(newPostRef, postData);
};
