import { styled } from "@mui/system";
import RegisterForm from "components/forms/RegisterForm";

const RegisterWrapper = styled("div")(({ theme }) => ({
  // no props
}));

const Register = () => {
  return (
    <RegisterWrapper>
      <RegisterForm />
    </RegisterWrapper>
  );
};
export default Register;
