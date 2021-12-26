import { UserInfo } from "firebase/auth";

export interface CustomUser extends UserInfo {
  username: string;
  birthDate: Date;
}

export interface SetCurrentUserParams {
  uid: string;
}
