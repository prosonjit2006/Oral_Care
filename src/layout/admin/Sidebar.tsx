import { Box, Container, Typography } from "@mui/material";
import { NavLink, type NavLinkProps } from "react-router-dom";
import { sidebarNavigation } from "../../services/json/admin.json";

const Sidebar = () => {
  const linkStyle: NavLinkProps["className"] = ({ isActive }) =>
    `transition block p-[10px] text-[#ECECEC] ${
      isActive
        ? "text-blue-400 font-bold border-r-4 border-blue-200 "
        : "text-white hover:text-blue-300"
    }`;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        width: "100%",
        height: "100vh",
        position: 'sticky',
        top: 0,
        left: 0,
        background: "linear-gradient(155deg, #1D546D, #5F9598)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Box
        sx={{
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid gray",
          padding: 2,
          pb: 3,
        }}
      >
        {/* logo */}
        <Box
          component="a"
          // href="/"
          onClick={() => (window.location.pathname = "/")}
          sx={{}}
        >
          <img src="/logo.png" alt="logo img" />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ color: "wheat", textAlign: "center", mt: "3px" }}
        >
          Admin Console
        </Typography>
      </Box>

      {/* nav items */}
      <Box sx={{ mt: 1 }}>
        {sidebarNavigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/admin"}
              className={linkStyle}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <Icon />

                {item.name}
              </Box>
            </NavLink>
          );
        })}
      </Box>
    </Container>
  );
};

export default Sidebar;

// import { Box, Container } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import { sidebarNavigation } from "../../services/json/admin.json";

// const Sidebar = () => {
//   return (
//     <Container
//       disableGutters
//       maxWidth={false}
//       sx={{
//         // height: "calc(100vh - 69px)",
//         // position: 'fixed',
//         width: "100%",
//         height: "100vh",
//         background: "linear-gradient(155deg, #1D546D, #5F9598)",
//         display: "flex",
//         justifyContent: "flex-start",
//       }}
//     >
//       <Box
//         sx={{
//           flex: 1
// ,          display: "flex",
//           flexDirection: "column",
//           alignItems: "start",
//           gap: "10px",
//           padding: "25px 0px",
//         }}
//       >
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <Box
//             component="a"
//             sx={{ borderBottom: "1px solid gray", padding: "0 0 20px 0" }}
//           >
//             <img src="/logo.png" alt="logo img" />
//           </Box>
//         </Box>

//         {sidebarNavigation.map((item) => (
//           <NavLink
//             key={item.id}
//             to={item.path}
//             style={{ padding: "5px 0", color: "#ECECEC" }}
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default Sidebar;
