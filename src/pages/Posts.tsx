import { styled } from "@mui/system";
import CreatePost from "components/CreatePost";
import { useAppSelector } from "hooks/redux";

const Content = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Posts = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return <div>{isAuthenticated && <CreatePost />}</div>;
};

export default Posts;
