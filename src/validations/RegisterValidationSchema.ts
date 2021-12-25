import * as yup from "yup";
import i18n from "localization/i18n";

export const registerValidationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  birthDate: yup.date().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], i18n.t("Passwords must and should match")),
});
