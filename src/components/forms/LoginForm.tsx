import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "validations/LoginValidationSchema";
import PasswordField from "components/commons/PasswordField";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { LoginFormData } from "types/forms/login";
import { auth } from "_firebase/authentication";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import React from "react";

const Form = styled("form")(({ theme }) => ({
  // no props
}));

const defaultValues: LoginFormData = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(loginValidationSchema),
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(email, password);
  };

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

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
      {!loading && error && (
        <Typography color="red">{error.message}</Typography>
      )}
      <LoadingButton type="submit" variant="contained" loading={loading}>
        {t("Login")}
      </LoadingButton>
    </Form>
  );
};
export default LoginForm;
