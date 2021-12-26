import { auth } from "./init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { RegisterFormData } from "types/forms/register";
import { LoginFormData } from "types/forms/login";

export const register = async (registerFormData: RegisterFormData) => {
  const { email, password } = registerFormData;
  const userCrendential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCrendential.user;
};

export const login = async (loginFormData: LoginFormData) => {
  const { email, password } = loginFormData;
  const userCrendential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCrendential.user;
};

export const logout = async () => {
  await signOut(auth);
};
