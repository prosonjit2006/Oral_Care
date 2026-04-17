import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginInputForm } from "../services/json/admin.json";
import loginSchema from "../services/validation/login.validation";
import { useState } from "react";
import { toast } from "sonner";
import { endpoint } from "../services/helper/endpoint";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../lib/AxiosInstance";

export type LoginDataType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginDataType) => {
    setIsLoading(true);
    try {
      const response = await api.post(`${endpoint.auth.login}`, data);
      //  console.log(data);
      console.log("response login---", response);
      if (response.status === 200) {
        toast.success(response.data.message);
        Cookies.set("token", response.data.accessToken, {
          expires: 15 * 60 * 1000,
        });
        Cookies.set("role", response.data.user.role, {
          expires: 15 * 60 * 1000,
        });
        Cookies.set("userDetails", JSON.stringify(response.data.user), {
          expires: 15 * 60 * 1000,
        });
        // localStorage.setItem("token", response.data.accessToken);
        // localStorage.setItem("role", response.data.user.role);
        // localStorage.setItem("userDetails", JSON.stringify(response.data.user));
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }

        reset();
        setIsError(null);
      }
    } catch (error: any) {
      console.log(error.response);
      setIsError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = (data: LoginDataType) => {
  //   console.log("data", data);
  //   reset();
  // };

  return (
    <Container
      // maxWidth={"100vh"}
      maxWidth={false}
      sx={{ background: "linear-gradient(155deg, #CEEBFE, #EDD6FF)" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "15px",
            border: "1px dotted gray",
            borderRadius: "10px",
            gap: "9px",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Login
          </Typography>

          {loginInputForm.map((field) => {
            const name = field.name as keyof LoginDataType;
            return (
              <TextField
                key={field?.name}
                id="outlined-basic"
                variant="outlined"
                type={field?.type}
                label={field?.label}
                placeholder={field?.placeholder}
                {...register(name)}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              ></TextField>
            );
          })}

          {isError && (
            <Typography sx={{ color: "red", mb: 2 }}>{isError}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "loading..." : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
