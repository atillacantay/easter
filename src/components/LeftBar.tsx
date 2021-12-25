import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const LeftBarWrapper = styled("div")(({ theme }) => ({
  border: "1px solid red",
  height: "100%",
}));

const LeftBar = () => {
  const { t } = useTranslation();

  return <LeftBarWrapper>topics</LeftBarWrapper>;
};
export default LeftBar;
