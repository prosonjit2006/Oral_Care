import { useState } from "react";
import { Box, Container, Drawer } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminWrapper = () => {
  // State to manage the mobile sidebar toggle
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 280; // Fixed width for the mobile drawer

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#1B2730", // Matched dark theme from reference image
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* ── MOBILE OVERLAY SIDEBAR (Hidden on lg and above) ── */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "transparent", // Let the Sidebar's gradient show
            border: "none",
          },
        }}
      >
        <Sidebar onClose={handleDrawerToggle} />
      </Drawer>

      {/* ── DESKTOP PERMANENT SIDEBAR (Hidden below lg) ── */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: { lg: "220px", xl: "260px" }, // Fixed responsive widths
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>

      {/* ── RIGHT SIDE: NAVBAR + CONTENT ── */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            lg: "calc(100% - 220px)",
            xl: "calc(100% - 260px)",
          },
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          {/* Pass the toggle function to the Navbar */}
          <AdminNavbar onMenuClick={handleDrawerToggle} />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 1.5, sm: 2, md: 3 },
            backgroundColor: "#1A222B", // Dark content area matching reference
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminWrapper;
