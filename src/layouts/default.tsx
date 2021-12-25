import { Container } from "@mui/material";
import Header from "components/Header";

const DefaultLayout: React.FC = ({ children }) => (
  <Container maxWidth="lg">
    <Header />
    {children}
  </Container>
);

export default DefaultLayout;
