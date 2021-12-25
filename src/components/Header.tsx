import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const AppHeader = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
}));

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppHeader position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppHeader>
    </Box>
  );
};
export default Header;
