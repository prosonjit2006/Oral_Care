import { Box, Button, Container, Typography } from "@mui/material";
import { NavLink, useNavigate, type NavLinkProps } from "react-router-dom";
import { sidebarNavigation } from "../../services/json/admin.json";
import { ArrowLeft } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  // Added responsive text sizing (text-sm to text-base) and responsive padding
  const linkStyle: NavLinkProps["className"] = ({ isActive }) =>
    `transition block p-2 md:p-[10px] text-sm md:text-base text-[#ECECEC] rounded-sm ${
      isActive
        ? "text-blue-400 font-bold border-r-4 border-blue-200 bg-black/10"
        : "text-white hover:text-blue-300 hover:bg-black/5"
    }`;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100vh", // Full viewport height
        position: "sticky",
        top: 0,
        left: 0,
        background: "linear-gradient(155deg, #1D546D, #5F9598)",
        display: "flex",
        flexDirection: "column", // Stack items vertically
        padding: { xs: 1.5, sm: 2, lg: 2.5 }, // Responsive padding
      }}
    >
      {/* ── 1. TOP: FIXED LOGO AREA ── */}
      <Box
        onClick={() => navigate("/")}
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Softer border
          paddingBottom: { xs: 1.5, md: 2 },
          marginBottom: { xs: 1, md: 2 },
          flexShrink: 0, // Prevents this section from squishing when nav items fill up
          cursor: "pointer",
          width: "100%",
        }}
      >
        {/* Made the logo image width responsive via Tailwind */}
        <img
          src="/logo.png"
          alt="logo img"
          className="w-12 sm:w-14 md:w-16 lg:w-20 object-contain"
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: "wheat",
            textAlign: "center",
            mt: 1,
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            fontWeight: 500,
          }}
        >
          Admin Console
        </Typography>
      </Box>

      {/* ── 2. MIDDLE: SCROLLABLE NAV ITEMS ── */}
      <Box
        sx={{
          flexGrow: 1, // Takes up all remaining vertical space
          overflowY: "auto", // Makes only this section scrollable
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          paddingRight: "4px",
          // Customizing the scrollbar so it looks clean against the blue gradient
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {sidebarNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={linkStyle}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: "8px", md: "10px" },
                }}
              >
                <Icon size={20} className="shrink-0" />
                {/* Truncate text just in case the screen gets too narrow */}
                <span className="truncate">{item.name}</span>
              </Box>
            </NavLink>
          );
        })}
      </Box>

      {/* ── 3. BOTTOM: FIXED BUTTON ── */}
      <Button
        variant="outlined"
        onClick={() => navigate("/")} // Hooked up the navigate action
        sx={{
          mt: "auto", 
          flexShrink: 0, // Prevents the button from being squished by the scroll area
          color: "white",
          borderColor: "#fafafa",
          textTransform: "none", // Stops text from being fully capitalized
          fontWeight: 600,
          fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
          padding: { xs: "8px", md: "10px 13px" },
          display: "flex",
          gap: "8px",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <ArrowLeft size={18} />
        {/* Hide text on very small screens - md, keep just the icon if needed */}
        <span className="hidden md:inline">Back To Home</span>
      </Button>
    </Container>
  );
};

export default Sidebar;
