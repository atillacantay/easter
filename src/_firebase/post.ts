import { db } from "./init";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { CreatePostRequest, Post } from "types/post";

export const getById = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const post = postSnap.data() as Post;
    return post;
  } else {
    return {} as Post;
  }
};

export const create = async (postData: CreatePostRequest) => {
  const newPostRef = doc(collection(db, "posts"));
  await setDoc(newPostRef, { ...postData, id: newPostRef.id });
  return await getById(newPostRef.id);
};
