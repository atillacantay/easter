export interface Owner {
  id: string;
  username: string;
}

export interface GetPostRequest {
  id: string;
}

export interface CreatePostRequest {
  id?: string;
  title: string;
  owner: Owner;
  content: string;
}

export interface Post {
  id?: string;
  title: string;
  owner: Owner;
  content: string;
}

export type PostParams = {
  id: string;
};
