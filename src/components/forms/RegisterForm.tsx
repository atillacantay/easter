import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormData } from "types/forms/register";
import { registerValidationSchema } from "validations/RegisterValidationSchema";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import PasswordField from "components/commons/PasswordField";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { register } from "_redux/features/authSlice";
import { Status } from "types/redux";

const Form = styled("form")(({ theme }) => ({
  // no props
}));

const defaultValues: RegisterFormData = {
  username: "",
  email: "",
  birthDate: null,
  password: "",
  confirmPassword: "",
};

const RegisterForm = () => {
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
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = async (registerFormData: RegisterFormData) => {
    await dispatch(register(registerFormData));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <TextField
            {...field}
            label={t("Username")}
            fullWidth
            margin="normal"
            error={Boolean(errors.username)}
            helperText={errors.username?.message}
          />
        )}
      />
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
        name="birthDate"
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={t("Birth Date")}
              inputFormat={"dd/MM/yyyy"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.birthDate)}
                  helperText={errors.birthDate?.message}
                />
              )}
              {...field}
            />
          </LocalizationProvider>
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
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <PasswordField
            {...field}
            label={t("Confirm Password")}
            fullWidth
            margin="normal"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />
      {status.register === Status.failed && error.register && (
        <Typography color="red">{error.register}</Typography>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        loading={status.register === Status.loading}
      >
        {t("Register")}
      </LoadingButton>
    </Form>
  );
};
export default RegisterForm;
