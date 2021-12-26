import { styled } from "@mui/system";
import CreatePost from "components/CreatePost";

const Content = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const Posts = () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default Posts;
