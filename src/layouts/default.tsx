import { Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Header from "components/Header";
import LeftBar from "components/LeftBar";
import { Outlet } from "react-router-dom";

const Content = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const RightFrame = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const DefaultLayout = () => (
  <Container maxWidth="lg">
    <Header />
    <Content>
      <Grid container>
        <Grid item xs={3} sx={{ display: { xs: "none", sm: "block" } }}>
          <LeftBar />
        </Grid>
        <Grid item xs={9}>
          <RightFrame>
            <Outlet />
          </RightFrame>
        </Grid>
      </Grid>
    </Content>
  </Container>
);

export default DefaultLayout;
