import { Box, Container } from "@mui/material";
import { NavLink } from "react-router-dom";
import { sidebarNavigation } from "../../services/json/admin.json";

const Sidebar = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "calc(100vh - 69px)",
        bgcolor: "yellow",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
          padding: "25px 0px",
        }}
      >
        {sidebarNavigation.map((item) => (
          <NavLink key={item.id} to={item.path} >
            {item.name}
          </NavLink>
        ))}
      </Box>
    </Container>
  );
};

export default Sidebar;
