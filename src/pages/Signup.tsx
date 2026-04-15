import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import signupSchema from "../services/validation/signup.validation";
import { signupInputForm } from "../services/json/admin.json";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export type SignupDataType = {
  // name: 'name' | 'email' | 'email' | 'phone' | 'password' | 'confirmpassword',
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);

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

  const onSubmit = async (data: SignupDataType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://react-crud-product-node.onrender.com/api/auth/register",
        data,
      );
      //  console.log(data);
      console.log("response", response);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/");
        reset();
      }
    } catch (error: any) {
      console.log(error.response);
      setIsError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // const onSubmit = (data: SignupDataType) => {
  //   console.log("data", data);
  //   reset();
  // };

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

          {isError && (
            <Typography sx={{ color: "red", mb: 2 }}>{isError}</Typography>
          )}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Loading..." : "Signup"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
