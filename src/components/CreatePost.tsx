import { LoadingButton } from "@mui/lab";
import { Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import React from "react";
import { useTranslation } from "react-i18next";
import { PostData } from "types/post";
import { createPost } from "_redux/features/postSlice";

const CreatePostMock = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TextEditorWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(1),
}));

const CreatePost = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const editorRef = React.useRef<TMUIRichTextEditorRef>(null);
  const [editorOpen, setEditorOpen] = React.useState(false);

  const onSubmit = () => {
    if (editorRef.current) {
      editorRef.current.save();
    }
  };

  const handleSave = (content: string) => {
    const postData: PostData = {
      user,
      content,
    };
    dispatch(createPost(postData));
  };

  const toggleEditor = () => setEditorOpen((state) => !state);

  return (
    <div>
      {editorOpen ? (
        <div>
          <TextEditorWrapper>
            <MUIRichTextEditor
              label="Start typing..."
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
          </TextEditorWrapper>
          <LoadingButton onClick={onSubmit} variant="contained">
            {t("Create")}
          </LoadingButton>
        </div>
      ) : (
        <CreatePostMock onClick={toggleEditor}></CreatePostMock>
      )}
    </div>
  );
};

export default CreatePost;
