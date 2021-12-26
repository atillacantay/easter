import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import MUIRichTextEditor from "mui-rte";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CreatePostFormData } from "types/forms/post";
import { CreatePostRequest } from "types/post";
import { Status } from "types/redux";
import { createPost } from "_redux/features/postSlice";
import InputField from "./InputField";
import { convertToRaw } from "draft-js";
import { createPostValidationSchema } from "validations/CreatePostValidationSchema";

const defaultValues: CreatePostFormData = {
  title: "",
  content: "",
};

const CreatePost = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { status, error } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(createPostValidationSchema),
  });

  const [editorOpen, setEditorOpen] = React.useState(false);

  const onSubmit = async (formData: CreatePostFormData) => {
    const postData: CreatePostRequest = {
      title: formData.title,
      content: formData.content,
      owner: {
        id: user.uid,
        username: user.username,
      },
    };
    dispatch(createPost(postData));
  };

  const toggleEditor = () => setEditorOpen((state) => !state);

  return (
    <div>
      {editorOpen ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="title"
            register={register("title")}
            placeholder={t("Title")}
          />
          <Box mb={1} />
          <MUIRichTextEditor
            label={t("Start typing...")}
            controls={[
              "title",
              "bold",
              "italic",
              "underlined",
              "link",
              "numberList",
              "bulletList",
              "quote",
              "clear",
              "striketrough",
            ]}
            onChange={(value) => {
              const content = JSON.stringify(
                convertToRaw(value.getCurrentContent())
              );
              setValue("content", content);
            }}
          />
          <Box mb={6} />
          <Typography color="red">
            {errors.title?.message || errors.content?.message}
          </Typography>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={status.createPost === Status.loading}
          >
            {t("Create")}
          </LoadingButton>
        </form>
      ) : (
        <InputField placeholder={t("Create a post")} onClick={toggleEditor} />
      )}
    </div>
  );
};

export default CreatePost;
