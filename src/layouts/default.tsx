import { Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import Header from "components/Header";
import Topics from "components/Topics";
import { Outlet } from "react-router-dom";

const Content = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

const RightFrame = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

const DefaultLayout = () => (
  <Container id="container" maxWidth="lg">
    <Header />
    <Content id="content-container">
      <Grid id="content-grid" container>
        <Grid
          id="content-grid-left"
          item
          xs={3}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Topics />
        </Grid>
        <Grid id="content-grid-right" item xs={9}>
          <RightFrame id="right-content">
            <Outlet />
          </RightFrame>
        </Grid>
      </Grid>
    </Content>
  </Container>
);

export default DefaultLayout;
