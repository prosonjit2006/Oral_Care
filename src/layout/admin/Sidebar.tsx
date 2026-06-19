import { Box, Button, Container, IconButton } from "@mui/material";
import { NavLink, useNavigate, type NavLinkProps } from "react-router-dom";
import { sidebarNavigation } from "../../services/json/admin.json";
import { ArrowLeft, X } from "lucide-react"; // Added X icon

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  // Accept onClose prop
  const navigate = useNavigate();

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
        height: "100vh",
        position: "relative", // Required for absolute positioning of the X button
        background: "linear-gradient(155deg, #0f1c24, #1D546D)", // Deepened gradient to match ref image
        display: "flex",
        flexDirection: "column",
        padding: { xs: 1.5, sm: 2, lg: 2.5 },
        boxShadow: "4px 0 15px rgba(0,0,0,0.5)", // Gives it depth when sliding out
      }}
    >
      {/* ── MOBILE CLOSE BUTTON (Matches Reference Image) ── */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "white",
            color: "black",
            width: 28,
            height: 28,
            "&:hover": { backgroundColor: "#e0e0e0" },
            display: { lg: "none" }, // Failsafe to ensure it never shows on desktop
            zIndex: 50,
          }}
        >
          <X size={18} strokeWidth={3} />
        </IconButton>
      )}

      {/* ── 1. TOP: FIXED LOGO AREA ── */}
      <Box
        onClick={() => navigate("/")}
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: { xs: 1.5, md: 2 },
          marginBottom: { xs: 1, md: 2 },
          flexShrink: 0,
          cursor: "pointer",
          width: "100%",
          pt: onClose ? 2 : 0, // Adds top padding if the close button is present so logo doesn't overlap
        }}
      >
        <img
          src="/logo.png"
          alt="logo img"
          className="w-16 sm:w-20 md:w-24 lg:w-28 object-contain"
        />
      </Box>

      {/* ── 2. MIDDLE: SCROLLABLE NAV ITEMS ── */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          paddingRight: "4px",
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
              onClick={onClose} // Auto-closes the mobile drawer when a link is clicked!
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Icon size={20} className="shrink-0" />
                <span className="truncate tracking-wide">{item.name}</span>
              </Box>
            </NavLink>
          );
        })}
      </Box>

      {/* ── 3. BOTTOM: FIXED BUTTON ── */}
      <Button
        variant="outlined"
        onClick={() => navigate("/")}
        sx={{
          mt: "auto",
          flexShrink: 0,
          color: "white",
          borderColor: "rgba(255,255,255,0.3)",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.85rem",
          padding: "10px 16px",
          display: "flex",
          gap: "8px",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <ArrowLeft size={18} />
        Back To Home
      </Button>
    </Container>
  );
};

export default Sidebar;
