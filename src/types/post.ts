import { CustomUser } from "./firebase/user";

export interface PostData {
  user: CustomUser;
  content: string;
}
