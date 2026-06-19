import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { LogOutIcon } from "lucide-react";
import { Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/useredux";
import { LogOutUser } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminNavbar() {
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
      position="static" // Changed from sticky to static because the wrapper handles layout now
      elevation={0} // Removes the drop shadow for a flatter, modern look
      sx={{
        backgroundColor: "#25343F",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle divider
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: { xs: "56px", md: "64px" }, // Slightly thinner on mobile
          }}
        >
          {/* Responsive Typography */}
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
            }}
          >
            Dashboard
          </Typography>

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
              {/* Hide text on 'xs' (mobile) to prevent squishing, show on 'sm' and up */}
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

              {/* Avatar */}
              <Tooltip title="Profile Details">
                <IconButton
                  sx={{
                    p: 0,
                    color: "white",
                    border: "1px solid #605B51",
                    backgroundColor: "#213C51",
                    width: { xs: 32, sm: 40 }, // Smaller avatar on mobile
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

            {/* Logout Icon */}
            <Tooltip title="Logout">
              <IconButton
                onClick={() => handleLogout()}
                sx={{ p: { xs: 0.5, sm: 1 } }}
              >
                <LogOutIcon
                  size={20} // Slightly smaller icon to match
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
