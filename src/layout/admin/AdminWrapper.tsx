import { Box, Container } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#bababa",
        display: " flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AdminNavbar />

      <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box sx={{ width: "20%", }}>
          <Sidebar />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminWrapper;
