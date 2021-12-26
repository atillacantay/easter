import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostRequest, GetPostRequest, Post } from "types/post";
import { Status } from "types/redux";
import { history } from "utils/history";
import { postAPI } from "_firebase";

export interface PostState {
  post: Post;
  status: {
    createPost: Status;
    getPost: Status;
  };
  error: {
    createPost?: string;
    getPost?: string;
  };
}

const initialState: PostState = {
  post: {} as Post,
  status: {
    createPost: Status.idle,
    getPost: Status.idle,
  },
  error: {},
};

/**
 * Thunks
 */
export const createPost = createAsyncThunk<
  undefined,
  CreatePostRequest,
  {
    rejectValue: string;
  }
>("post/create", async (postData, thunkAPI) => {
  try {
    const createdPost = await postAPI.create(postData);
    if (createdPost) {
      history.push(`/post/${createdPost.id}`);
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getPost = createAsyncThunk<
  Post,
  GetPostRequest,
  {
    rejectValue: string;
  }
>("post/get", async ({ id }, thunkAPI) => {
  try {
    return await postAPI.getById(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

/**
 * Reducers
 */
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.status.createPost = Status.loading;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status.createPost = Status.succeeded;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status.createPost = Status.failed;
        state.error.createPost = action.payload;
      })
      .addCase(getPost.pending, (state, action) => {
        state.status.getPost = Status.loading;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.status.getPost = Status.succeeded;
        state.post = action.payload;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status.getPost = Status.failed;
        state.error.getPost = action.payload;
      });
  },
});

/**
 * Action Creators
 */
// export const {  } = postSlice.actions;

export default postSlice.reducer;
