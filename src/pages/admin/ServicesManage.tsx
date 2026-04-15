import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newServicesSchema from "../../services/validation/newservice.validation";

type NewServicesType = {
  servicename: string;
  description?: string;
  imgurl?: string;
  uploadimg?: string;
};

const ServicesManage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewServicesType>({
    resolver: yupResolver(newServicesSchema),
  });

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [services, setServices] = useState<NewServicesType[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem("services");
    if (stored) setServices(JSON.parse(stored));
  }, []);

  // Convert file to strImg
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const strImg = reader.result as string;

      setValue("uploadimg", strImg);
      setPreview(strImg);
    };

    reader.readAsDataURL(file);
  };

  // Submit
  const onSubmit = (data: NewServicesType) => {
    const finalImage = data.uploadimg || data.imgurl || "";

    const newService = {
      ...data,
      uploadimg: finalImage,
    };

    const updated = [...services, newService];

    setServices(updated);
    localStorage.setItem("services", JSON.stringify(updated));

    reset();
    setPreview(null);
    handleClose();
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          All Service Lists
        </Typography>

        <Button variant="contained" onClick={handleOpen}>
          Add New Services
        </Button>
      </Box>

      {/* Dialog */}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Add New Service</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Service Name"
            {...register("servicename")}
            error={!!errors.servicename}
            helperText={errors.servicename?.message}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            {...register("description")}
          />

          <TextField label="Image URL" {...register("imgurl")} />

          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </Button>

          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{
                width: 200,
                height: 200,
                objectFit: "cover",
                mx: "auto",
                borderRadius: 2,
              }}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Services */}
      <Box
        sx={{
          mt: 3,
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr)) ",
        }}
      >
        {services.map((item, index) => {
          const img = item.uploadimg || item.imgurl;

          return (
            <Box
              key={index}
              sx={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                borderRadius: "5px",
              }}
            >
              <Box
                component="img"
                src={img}
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "5px 5px 0 0",
                }}
              />

              <Box sx={{ p: "3px" }}>
                <Typography>{item.servicename}</Typography>
                <Typography variant="body2">{item.description}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default ServicesManage;
