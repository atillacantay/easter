import { styled } from "@mui/system";
import LoginForm from "components/forms/LoginForm";
import { useTranslation } from "react-i18next";

const LoginWrapper = styled("div")(({ theme }) => ({
  // no props
  maxWidth: theme.breakpoints.values.sm,
}));

const Login = () => {
  const { t } = useTranslation();

  return (
    <LoginWrapper>
      <LoginForm />
    </LoginWrapper>
  );
};
export default Login;
