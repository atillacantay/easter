import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React from "react";
import { useParams } from "react-router";
import { PostParams } from "types/post";
import { getPost } from "_redux/features/postSlice";

const Content = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Post = () => {
  const { post } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const { id } = useParams<PostParams>();

  React.useEffect(() => {
    if (id) {
      dispatch(getPost({ id }));
    }
  }, [dispatch, id]);

  return <div>post detail</div>;
};

export default Post;
