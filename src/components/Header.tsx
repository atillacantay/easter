import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "./SearchBar";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { logout } from "_redux/features/authSlice";

const HeaderWrapper = styled("div")(({ theme }) => ({
  // no props
}));

const AppHeader = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
}));

const HeaderRight = styled("div")(({ theme }) => ({}));

const Header = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onLogoutClick = async () => {
    await dispatch(logout());
  };

  return (
    <HeaderWrapper id="header">
      <AppHeader position="static" color="transparent">
        <Toolbar disableGutters>
          <IconButton component={Link} to="/">
            <DriveFileRenameOutlineRoundedIcon />
          </IconButton>
          <SearchBar />
          <Box flex={1} />
          <HeaderRight>
            {!isAuthenticated ? (
              <React.Fragment>
                <Button component={Link} to="/login" color="inherit">
                  {t("Login")}
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  {t("Register")}
                </Button>
              </React.Fragment>
            ) : (
              <Button onClick={onLogoutClick} color="inherit">
                {t("Logout")}
              </Button>
            )}
          </HeaderRight>
        </Toolbar>
      </AppHeader>
    </HeaderWrapper>
  );
};
export default Header;
