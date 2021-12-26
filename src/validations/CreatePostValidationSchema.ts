import * as yup from "yup";

export const createPostValidationSchema = yup.object({
  title: yup.string().required().min(6).max(100),
  content: yup.string().required().min(20),
});
