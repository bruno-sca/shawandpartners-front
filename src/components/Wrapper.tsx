import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Wrapper: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ minHeight: "100vh", py: { xs: 2, sm: 4, md: 8 } }}
    >
      <Outlet />
    </Container>
  );
};
