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

function AdminNavbar() {
  // const {} = useAppSelector((state)=> state.auth) // this is for the name and email showing in the avater part

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
    <AppBar position="sticky" sx={{ backgroundColor: "#25343F" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Dashboard</Typography>

          {/* icon and logout icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Tooltip title="Profile Details">
              <IconButton
                sx={{
                  p: 0,
                  color: "white",
                  border: "1px solid #605B51",
                  backgroundColor: "#213C51",
                }}
              >
                <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" onClick={() => handleLogout()}>
              <LogOutIcon
                // color="#6594B1"
                size={23}
                className=" text-[#6594B1] hover:text-[#E8E2D8] transition-all duration-300"
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AdminNavbar;
