import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const TopicsWrapper = styled("div")(({ theme }) => ({
  border: "1px solid red",
  height: "100%",
}));

const Topics = () => {
  const { t } = useTranslation();

  return <TopicsWrapper>topics</TopicsWrapper>;
};
export default Topics;
