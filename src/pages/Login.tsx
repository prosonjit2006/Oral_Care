import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useForm, type Path } from "react-hook-form";
import { loginInputForm } from "../services/json/admin.json";
import loginSchema from "../services/validation/login.validation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useredux";
import { closeDialog, LoginUser, openSignup } from "../store/slices/auth.slice";
import type { LoginPayload } from "../type/interface/auth.interface";
import DynamicInput from "../components/DynamicInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isError, isLoginDialogOpen } = useAppSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const response = await dispatch(LoginUser(data)).unwrap();
      console.log("res in login page", response);
      if (response.success) {
        dispatch(closeDialog());

        toast.success(response.message);

        if (response?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

        reset();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log("err", error);
      toast.error(error);
    }
  };

  return (
    <Dialog
      open={isLoginDialogOpen}
      onClose={() => dispatch(closeDialog())}
      fullWidth
      maxWidth="sm"
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          padding: {
            xs: "25px 20px",
            sm: "40px 35px",
          },
          borderRadius: "24px",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.85)",
          border: "1px solid rgba(255,255,255,0.4)",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Heading Section */}
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                fontSize: {
                  xs: "2rem",
                  sm: "2.4rem",
                },
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                mt: 1,
                fontSize: "0.95rem",
              }}
            >
              Login to continue your journey
            </Typography>
          </Box>

          {/* Dynamic Input Fields */}
          {loginInputForm.map((field) => (
            <DynamicInput<LoginPayload>
              key={field.name}
              name={field.name as Path<LoginPayload>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              required={field.required}
              register={register}
              errors={errors}
              sx={{
                mt: 1,

                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                  backgroundColor: "#ffffff",
                  transition: "0.3s ease",

                  "& fieldset": {
                    borderColor: "#dbe4f0",
                  },

                  "&:hover fieldset": {
                    borderColor: "#7c3aed",
                  },

                  "&.Mui-focused fieldset": {
                    borderWidth: "2px",
                    borderColor: "#7c3aed",
                  },
                },

                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#7c3aed",
                },
              }}
            />
          ))}

          {/* Error Message */}
          {isError && (
            <Typography
              sx={{
                color: "#ef4444",
                fontSize: "0.9rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {isError}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 1,
              height: "52px",
              borderRadius: "14px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0px 8px 20px rgba(124,58,237,0.35)",
              transition: "0.3s ease",

              "&:hover": {
                background: "linear-gradient(135deg, #6d28d9, #1d4ed8)",
                transform: "translateY(-2px)",
                boxShadow: "0px 12px 25px rgba(124,58,237,0.4)",
              },

              "&:disabled": {
                background: "#94a3b8",
                color: "#fff",
              },
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          {/* Footer Text */}
          <Typography
            sx={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "15px",
              mt: 1,
            }}
          >
            Don't have an account ?{" "}
            <span
              className="cursor-pointer hover:text-black hover:underline transition-all duration-300"
              onClick={() => dispatch(openSignup())}
            >
              Signup
            </span>
          </Typography>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default Login;
