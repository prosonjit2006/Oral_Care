import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Dialog, Paper, Typography } from "@mui/material";
import { useForm, type Path } from "react-hook-form";
import signupSchema from "../services/validation/signup.validation";
import { signupInputForm } from "../services/json/admin.json";
import { useAppDispatch, useAppSelector } from "../hooks/useredux";
import type { SignupPayload } from "../type/interface/auth.interface";
import {
  closeDialog,
  openLogin,
  RegisterUser,
  setImagePreview,
} from "../store/slices/auth.slice";
import { toast } from "sonner";
import DynamicInput from "../components/DynamicInput";

const Signup = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, imagePreview, isError, isSignupDialogOpen } =
    useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      image: null,
      role: "user",
    },
  });

  const onSubmit = async (data: SignupPayload) => {
    try {
      const response = await dispatch(RegisterUser(data)).unwrap();
      console.log("res in signup page", response);
      if (response.success) {
        toast.success(response.message);
        if (response.user) {
          // navigate("/login");
          dispatch(openLogin());
          reset();
        }
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
      open={isSignupDialogOpen}
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
            sm: "16px 35px",
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
          {/* heading section */}
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1e293b",
                fontSize: {
                  xs: "32px",
                  sm: "38px",
                },
              }}
            >
              Create Account
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                mt: 1,
                fontSize: "15px",
              }}
            >
              Signup to continue your journey
            </Typography>
          </Box>

          {/* input fields */}
          {signupInputForm.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as Path<SignupPayload>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}

          {/* upload img btn */}
          <Button
            variant="outlined"
            onClick={() => document.getElementById("fileInput")?.click()}
            // onClick={() => fileRef.current?.click()}
          >
            Upload Image
          </Button>
          <Box
            // ref={fileRef}
            id="fileInput"
            component="input"
            type="file"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setValue("image", file);

              const imgUrl = URL.createObjectURL(file);
              dispatch(setImagePreview(imgUrl));
            }}
          ></Box>

          {/* img preview */}
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="img"
              sx={{ width: "150px", height: "150px", borderRadius: "7px" }}
            />
          )}

          {/* Error Message */}
          {isError && (
            <Typography
              sx={{
                color: "#ef4444",
                fontSize: "15px",
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
              fontSize: "16px",
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
            {isLoading ? "Creating Account..." : "Signup"}
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
            Already have an account ?{" "}
            <span
              className=" cursor-pointer hover:text-black hover:underline transition-all duration-300"
              onClick={() => dispatch(openLogin())}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Paper>
    </Dialog>
  );
};

export default Signup;
