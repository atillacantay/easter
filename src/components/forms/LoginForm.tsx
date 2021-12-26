import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "validations/LoginValidationSchema";
import PasswordField from "components/commons/PasswordField";
import { LoginFormData } from "types/forms/login";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { login } from "_redux/features/authSlice";
import { Status } from "types/redux";

const Form = styled("form")(({ theme }) => ({
  // no props
}));

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (loginFormData: LoginFormData) => {
    await dispatch(login(loginFormData));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            {...field}
            label={t("Email")}
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordField
            {...field}
            label={t("Password")}
            fullWidth
            margin="normal"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
      />
      {status !== Status.loading && error && (
        <Typography color="red">{error}</Typography>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        loading={status === Status.loading}
      >
        {t("Login")}
      </LoadingButton>
    </Form>
  );
};
export default LoginForm;
