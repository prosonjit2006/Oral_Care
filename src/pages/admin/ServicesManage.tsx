import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newServicesSchema from "../../services/validation/newservice.validation";
import { toast } from "sonner";
import { serviceInputField } from "../../services/json/admin.json";
import DynamicInput from "../../components/DynamicInput";
import { services } from "../../services/json/data.json";
import { Pencil, Trash2 } from "lucide-react";

type NewServicesType = {
  servicename: string;
  description?: string;
  // imgurl?: string;
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
    defaultValues: {
      servicename: "",
      description: "",
      uploadimg: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Submit
  const onSubmit = (data: NewServicesType) => {
    console.log("data", data);
    toast.success("Service added successfully");
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
        <DialogTitle sx={{}}>Add New Service</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {serviceInputField.map((field) => (
            <DynamicInput
              name={field?.name}
              label={field?.label}
              placeholder={field?.placeholder}
              type={field?.type}
              rows={field?.rows}
              required={field.required}
              register={register}
              errors={errors}
            />

            // <TextField
            // sx={{mt: 1}}
            //   key={field.name}
            //   label={field.label}
            //   placeholder={field.placeholder}
            //   multiline
            //   rows={field.rows}
            //   {...register(field.name)}
            //   error={!!errors?.[field.name]}
            //   helperText={errors?.[field.name]?.message}
            // />
          ))}

          <Button variant="outlined" component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                setValue("uploadimg", file);
                setPreview(URL.createObjectURL(file));
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {services.map((item) => (
          <Box key={item.id} sx={{ width: "300px", position: "relative" }}>
            <Box component="img" src={item?.img} sx={{ objectFit: "cover" }} />
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body2">{item.description}</Typography>
            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Tooltip title="Toggle">
                    <Switch
                      // checked={isChecked}
                      // onChange={handleToggle}
                      color="primary" 
                    />
                  </Tooltip>
                }
                label="Toggle"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  aria-label="edit"
                  sx={{ height: 30, width: 30, bgcolor: "#bbdefb" }} // Adjust size as needed
                >
                  <Pencil size={16} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  aria-label="delete"
                  sx={{ height: 30, width: 30, bgcolor: "#ffcdd2" }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ServicesManage;
