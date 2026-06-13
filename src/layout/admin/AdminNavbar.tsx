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
  console.log("login crendital", loginCradintial);

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
            <Box sx={{ display: "flex", gap: 1}}>
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'end', textTransform: 'capitalize' }}>
                <Typography variant="body2">{loginCradintial.email}</Typography>
                <Typography variant="caption">{loginCradintial.role}</Typography>
              </Box>

              {/* icon part */}
              <Tooltip title="Profile Details">
                <IconButton
                  sx={{
                    p: 0,
                    color: "white",
                    border: "1px solid #605B51",
                    backgroundColor: "#213C51",
                  }}
                >
                  <Avatar
                    alt={loginCradintial.name}
                    src={loginCradintial.image}
                  />
                </IconButton>
              </Tooltip>
            </Box>
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
