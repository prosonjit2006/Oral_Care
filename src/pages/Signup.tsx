import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import signupSchema from "../services/validation/signup.validation";
import { signupInputForm } from "../services/json/admin.json";

export type SignupDataType = {
  // name: 'name' | 'email' | 'email' | 'phone' | 'password' | 'confirmpassword',
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupDataType>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = (data: SignupDataType) => {
    console.log("data", data);
    reset();
  };

  return (
    <Container
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
            Signup
          </Typography>

          {signupInputForm.map((field) => {
            const name = field.name as keyof SignupDataType;
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

export default Signup;
