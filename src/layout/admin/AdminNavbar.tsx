import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { LogOutIcon, Menu } from "lucide-react"; // Added Menu icon
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/useredux";
import { LogOutUser } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AdminNavbarProps {
  onMenuClick: () => void;
}

function AdminNavbar({ onMenuClick }:AdminNavbarProps) {
  // Accept the prop here
  const loginData = Cookies.get("user");
  const loginCradintial = loginData ? JSON.parse(loginData) : null;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(LogOutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#25343F",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: "60px", md: "70px" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* ── HAMBURGER TOGGLE (Hidden on Desktop) ── */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ display: { lg: "none" }, color: "white" }}
            >
              <Menu size={28} />
            </IconButton>

            <Typography
              variant="h4"
              sx={{
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.8rem",
                  lg: "2rem",
                },
                fontWeight: 600,
                color: "white",
              }}
            >
              Dashboard
            </Typography>
          </Box>

          {/* User Profile & Logout */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "8px", sm: "16px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 1.5 },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                  alignItems: "end",
                  textTransform: "capitalize",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {loginCradintial?.email || "Admin User"}
                </Typography>
                <Typography variant="caption" sx={{ color: "#8C9BAB" }}>
                  {loginCradintial?.role || "Admin"}
                </Typography>
              </Box>

              <Tooltip title="Profile Details">
                <IconButton
                  sx={{
                    p: 0,
                    color: "white",
                    border: "1px solid #605B51",
                    backgroundColor: "#213C51",
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                  }}
                >
                  <Avatar
                    alt={loginCradintial?.name}
                    src={loginCradintial?.image}
                    sx={{ width: "100%", height: "100%" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Tooltip title="Logout">
              <IconButton
                onClick={() => handleLogout()}
                sx={{ p: { xs: 0.5, sm: 1 } }}
              >
                <LogOutIcon
                  size={20}
                  className="text-[#6594B1] hover:text-[#E8E2D8] transition-all duration-300"
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNavbar;
