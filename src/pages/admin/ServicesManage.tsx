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
  Stack,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
  uploadimg?: string;
};

const ServicesManage = () => {
  const [editItem, setEditItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [serviceList, setServiceList] = useState(
    services.map((item) => ({
      ...item,
      enabled: true,
    })),
  );

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
      // imgurl: '',
      uploadimg: "",
    },
  });

  const handleOpen = () => {
    setOpen(true);
    setEditItem(null);
    reset();
    setPreview(null);
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
    reset();
    setPreview(null);
    setIsLoading(false);
  };

  //  submit - add + edit
  const onSubmit = (data: NewServicesType) => {
    // edit
    if (editItem) {
      const updated = serviceList.map((item) =>
        item.id === editItem.id
          ? {
              ...item,
              title: data.servicename,
              description: data.description,
              img: data.uploadimg || preview,
            }
          : item,
      );

      setServiceList(updated);
      toast.success("Service updated successfully");
    }
    // add
    else {
      const newService = {
        id: crypto.randomUUID(),
        title: data.servicename,
        description: data.description,
        img: data.uploadimg || preview,
        enabled: true,
      };

      setServiceList((prev) => [...prev, newService]);
      toast.success("Service added successfully");
    }

    setIsLoading(true);
    handleClose();
  };

  // toggle
  const handelToggle = (id: number) => {
    setServiceList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  // edit
  const handelEdit = (item: any) => {
    setEditItem(item);

    setValue("servicename", item.title);
    setValue("description", item.description);
    setValue("uploadimg", item.img);

    setPreview(item.img);
    setOpen(true);
  };

  // delete
  const handelDelete = (id: number) => {
    const filtered = serviceList.filter((item) => item.id !== id);
    setServiceList(filtered);
    toast.success("Service deleted successfully");
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          mb: 2
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          All Service Lists
        </Typography>

        <Button variant="contained" onClick={handleOpen}>
          Add New Services
        </Button>
      </Box>

      {/* dialog*/}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {editItem ? "Edit Service" : "Add New Service"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {serviceInputField.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              rows={field.rows}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}

          <Button variant="outlined" component="label">
            {preview ? "Update Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setValue("uploadimg", url);
                  setPreview(url);
                }
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
            {editItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* cards ui part */}
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <TableContainer>
          <Table
            sx={{ minWidth: 650, color: "#fff" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Service Image</TableCell>

                <TableCell align="center">Service Name</TableCell>
                <TableCell align="center">Service Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serviceList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    pointerEvents: row.enabled ? "auto" : "none",
                    opacity: row.enabled ? 1 : 0.5,
                  }}
                >
                  <TableCell align="center">
                    <Box
                      component="img"
                      src={row.img}
                      alt="img"
                      sx={{ width: "120px", height: "120px" }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      pointerEvents: "visible",
                      opacity: row.enabled ? 1 : 1,
                      color: "white",
                    }}
                  >
                    <Tooltip title={row.enabled ? "Disable" : "Enable"}>
                      <FormControlLabel
                        label={row.enabled ? "Enable" : "Disable"}
                        control={
                          <Switch
                            checked={row.enabled}
                            onChange={() => handelToggle(row.id)}
                          />
                        }
                      />
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center" sx={{ marginLeft: "10px " }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                       
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handelEdit(row)}
                          sx={{
                            bgcolor: "#bbdefb",
                            "&:hover": { bgcolor: "#e3f2fd" },
                          }}
                        >
                          <Pencil size={16} className="text-blue-700" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handelDelete(row.id)}
                          sx={{
                            bgcolor: "#ffcdd2",
                            "&:hover": { bgcolor: "#ffebee" },
                          }}
                        >
                          <Trash2 size={16} className="text-red-700" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ServicesManage;

// ui card model
//  <Box
//           sx={{
//             mt: 2,
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             // justifyContent: "space-between",
//             // flexWrap: "wrap",
//             gap: 2,
//             color: "white",
//           }}
//         >
//           {serviceList.map((item) => (
//             <Box
//               key={item.id}
//               sx={{
//                 width: "300px",
//                 height: "auto",
//                 // height: "300px",
//               }}
//             >
//               <Box
//                 sx={{
//                   pointerEvents: item.enabled ? "auto" : "none",
//                   opacity: item.enabled ? 1 : 0.5,
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={item.img}
//                   sx={{
//                     width: "300px",
//                     height: "300px",
//                     objectFit: "cover",
//                     borderRadius: "15px",
//                   }}
//                 />
//                 <Typography variant="h5">{item.title}</Typography>
//                 <Typography variant="body2">{item.description}</Typography>
//               </Box>

//               <Stack
//                 sx={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   mt: 1,
//                 }}
//               >
//                 <Tooltip title={item.enabled ? "Disable" : "Enable"}>
//                   <FormControlLabel
//                     label={item.enabled ? "Enable" : "Disable"}
//                     control={
//                       <Switch
//                         checked={item.enabled}
//                         onChange={() => handelToggle(item.id)}
//                       />
//                     }
//                   />
//                 </Tooltip>

//                 {/* edit & delete */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     gap: 1,
//                     pointerEvents: item.enabled ? "auto" : "none",
//                     opacity: item.enabled ? 1 : 0.5,
//                   }}
//                 >
//                   <Tooltip title="Edit">
//                     <IconButton
//                       onClick={() => handelEdit(item)}
//                       sx={{
//                         height: 35,
//                         width: 35,
//                         bgcolor: "#bbdefb",
//                         "&:hover": { bgcolor: "#e3f2fd" },
//                       }}
//                     >
//                       <Pencil size={16} className="text-blue-700" />
//                     </IconButton>
//                   </Tooltip>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       onClick={() => handelDelete(item.id)}
//                       sx={{
//                         height: 35,
//                         width: 35,
//                         bgcolor: "#ffcdd2",
//                         "&:hover": { bgcolor: "#ffebee" },
//                       }}
//                     >
//                       <Trash2 size={16} className="text-red-700" />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Stack>
//             </Box>
//           ))}
//         </Box>
