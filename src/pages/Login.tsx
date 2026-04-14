import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginInputForm } from "../services/json/admin.json";
import loginSchema from "../services/validation/login.validation";

export type LoginDataType = {
  email: string;
  password: string;
};

const Login = () => {
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

  const onSubmit = (data: LoginDataType) => {
    console.log("data", data);
    reset();
  };

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

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
