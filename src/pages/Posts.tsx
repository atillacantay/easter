import { styled } from "@mui/system";
import CreatePost from "components/CreatePost";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import MUIRichTextEditor from "mui-rte";
import { Status } from "types/redux";
import React from "react";
import { getPosts } from "_redux/features/postSlice";

const Content = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Posts = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { posts, status } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      {isAuthenticated && <CreatePost />}
      {status.getPosts === Status.loading ? (
        <span>loading...</span>
      ) : (
        posts.length > 0 &&
        posts.map((post) => (
          <div key={post.id}>
            <span>{post.owner.username}</span>
            <MUIRichTextEditor
              defaultValue={post.content}
              readOnly
              toolbar={false}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Posts;
