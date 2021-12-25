import { app } from ".";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
export const auth = getAuth(app);

export const login = () => {
  try {
    signInWithEmailAndPassword(auth, "test@test.com", "password");
  } catch (error) {
  } finally {
  }
};

export const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
  } finally {
  }
};
