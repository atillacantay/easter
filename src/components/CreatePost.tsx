import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import React from "react";
import { useTranslation } from "react-i18next";
import { CreatePostRequest } from "types/post";
import { Status } from "types/redux";
import { createPost } from "_redux/features/postSlice";
import InputField from "./InputField";

const CreateButton = styled(LoadingButton)(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

const CreatePost = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { status, error } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [title, setTitle] = React.useState("");
  const editorRef = React.useRef<TMUIRichTextEditorRef>(null);
  const [editorOpen, setEditorOpen] = React.useState(false);

  const onSubmit = () => {
    if (editorRef.current) {
      editorRef.current.save();
    }
  };

  const handleSave = (content: string) => {
    const postData: CreatePostRequest = {
      title,
      content,
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
        <div>
          <InputField
            placeholder={t("Title")}
            onChange={(event) => setTitle(event.target.value)}
          />
          <MUIRichTextEditor
            label={t("Start typing...")}
            onSave={handleSave}
            ref={editorRef}
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
          />
          <CreateButton
            onClick={onSubmit}
            variant="contained"
            loading={status.createPost === Status.loading}
          >
            {t("Create")}
          </CreateButton>
        </div>
      ) : (
        <InputField placeholder={t("Create a post")} onClick={toggleEditor} />
      )}
    </div>
  );
};

export default CreatePost;
