import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React from "react";

const Search = styled("div", {
  shouldForwardProp: (propName) => propName !== "clickable",
})<{ clickable?: boolean }>(({ theme, clickable }) => ({
  position: "relative",
  cursor: clickable ? "pointer" : "auto",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (propName) => propName !== "clickable",
})<{ clickable?: boolean }>(({ theme, clickable }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    cursor: clickable ? "pointer" : "auto",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

interface InputFieldProps {
  placeholder: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onClick,
  onChange,
}) => {
  return (
    <Search onClick={onClick} clickable={Boolean(onClick)}>
      <StyledInputBase
        placeholder={placeholder}
        onChange={onChange}
        clickable={Boolean(onClick)}
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};
export default InputField;
