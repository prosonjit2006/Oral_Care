import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = "Something went wrong";

  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.data || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  console.log("Error:", error);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        textAlign: "center",
        background: "linear-gradient(135deg, #ffe3e3, #ffd6e0)",
      }}
    >
      <Typography variant="h3" color="error">
        Oops!
      </Typography>

      <Typography variant="h6">{message}</Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorBoundary;
