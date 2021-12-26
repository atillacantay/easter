import { db } from "./init";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CustomUser } from "types/firebase/user";

export const getUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const user = userSnap.data() as CustomUser;
    user.birthDate = (user.birthDate as any).toDate();
    return user;
  }
};

export const saveUserData = async (userData: CustomUser) => {
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, userData, { merge: true });
};
