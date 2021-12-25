import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "./SearchBar";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { auth } from "_firebase/authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const HeaderWrapper = styled("div")(({ theme }) => ({
  // no props
}));

const AppHeader = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
}));

const HeaderRight = styled("div")(({ theme }) => ({}));

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const onLogoutClick = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <AppHeader position="static" color="transparent">
        <Toolbar disableGutters>
          <IconButton component={Link} to="/">
            <DriveFileRenameOutlineRoundedIcon />
          </IconButton>
          <SearchBar />
          <Box flex={1} />
          <HeaderRight>
            {!user ? (
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
