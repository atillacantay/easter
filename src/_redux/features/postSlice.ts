import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "types/redux";
import { postAPI } from "_firebase";

export interface PostState {
  creatingStatus: Status;
  creatingError?: string;
}

const initialState: PostState = {
  creatingStatus: Status.idle,
};

/**
 * Thunks
 */
export const createPost = createAsyncThunk<
  undefined,
  any,
  {
    rejectValue: string;
  }
>("post/create", async (postData, thunkAPI) => {
  try {
    await postAPI.create(postData);
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
        state.creatingStatus = Status.loading;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creatingStatus = Status.succeeded;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creatingStatus = Status.failed;
        state.creatingError = action.payload;
      });
  },
});

/**
 * Action Creators
 */
// export const {  } = postSlice.actions;

export default postSlice.reducer;
