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
        display: "flex",
        flexDirection: "row",
        height: "100vh", // 1. Locks the entire wrapper to the screen height
        overflow: "hidden", // 2. Prevents the whole page from scrolling
      }}
    >
      {/* ── LEFT SIDE: SIDEBAR ── */}
      <Box
        sx={{
          // Responsive width: slightly wider on mobile to fit text, 15% on desktop
          width: { xs: "25%", sm: "22%", md: "20%", lg: "15%" },
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* ── RIGHT SIDE: NAVBAR + CONTENT ── */}
      <Box
        sx={{
          width: { xs: "75%", sm: "78%", md: "80%", lg: "85%" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar sits at the top naturally */}
        <Box sx={{ flexShrink: 0 }}>
          <AdminNavbar />
        </Box>

        {/* Content Area: This is the ONLY part that scrolls */}
        <Box
          sx={{
            flexGrow: 1, // Takes up remaining height below navbar
            overflowY: "auto", // Adds a scrollbar here when content overflows
            p: { xs: 1.5, sm: 2, md: 3 }, // Responsive padding
            backgroundColor: "#F4F7FE", // Optional: Light background for content area contrast
            borderTopLeftRadius: "16px", // Adds a nice modern curve to the content box
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminWrapper;
