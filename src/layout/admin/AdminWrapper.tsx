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
        backgroundColor: "#25343F",
        display: " flex",
        flexDirection: "row",
        // width: "100%",
        // height: '100%'
      }}
    >
      <Box sx={{ width: "15%" }}>
        <Sidebar />
      </Box>
      <Box sx={{ width: "85%", display: "flex", flexDirection: "column",  }}>
        <AdminNavbar />
        <Outlet />
      </Box>

      {/* <AdminNavbar />
      <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <Box sx={{ width: "15%", }}>
          <Sidebar />
        </Box>
        <Box>
          <Outlet />
        </Box>
      </Box> */}
    </Container>
  );
};

export default AdminWrapper;
