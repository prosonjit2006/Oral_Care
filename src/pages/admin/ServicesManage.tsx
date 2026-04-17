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
  const [serviceList, setServiceList] = useState(
    services.map((item) => ({
      ...item,
      enabled: true,
    })),
  );

  const [editItem, setEditItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

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

  const handleOpen = () => {
    setEditItem(null);
    reset();
    setPreview(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
    reset();
    setPreview(null);
  };

  //  submit - add + edit
  const onSubmit = (data: NewServicesType) => {
    if (editItem) {
      // edit
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
    } else {
      // add
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          color: "white",
        }}
      >
        {serviceList.map((item) => (
          <Box key={item.id} sx={{ width: "315px" }}>
            <Box
              sx={{
                pointerEvents: item.enabled ? "auto" : "none",
                opacity: item.enabled ? 1 : 0.5,
              }}
            >
              <Box component="img" src={item.img} sx={{ width: "100%" }} />
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </Box>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <FormControlLabel
                label={item.enabled ? "Disable" : "Enable"}
                control={
                  <Switch
                    checked={item.enabled}
                    onChange={() => handelToggle(item.id)}
                  />
                }
              />

              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => handelEdit(item)}
                    sx={{ height: 35, width: 35, bgcolor: "#bbdefb" }}
                  >
                    <Pencil size={16} className="text-blue-700" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handelDelete(item.id)}
                    sx={{ height: 35, width: 35, bgcolor: "#ffcdd2" }}
                  >
                    <Trash2 size={16} className="text-red-700" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ServicesManage;

// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tooltip,
//   IconButton,
//   FormControlLabel,
//   Switch,
//   Stack,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import newServicesSchema from "../../services/validation/newservice.validation";
// import { toast } from "sonner";
// import { serviceInputField } from "../../services/json/admin.json";
// import DynamicInput from "../../components/DynamicInput";
// import { services } from "../../services/json/data.json";
// import { Pencil, Trash2 } from "lucide-react";

// type NewServicesType = {
//   servicename: string;
//   description?: string;
//   // imgurl?: string;
//   uploadimg?: string;
// };

// const ServicesManage = () => {
//   const [serviceStatus, setServiceStatus] = useState<boolean>(false);
//   const [serviceList, setServiceList] = useState(
//     services.map((item) => ({
//       ...item,
//       enabled: true, // add status per item
//     })),
//   );
//   const [editItem, setEditItem] = useState<any | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm<NewServicesType>({
//     resolver: yupResolver(newServicesSchema),
//     defaultValues: {
//       servicename: "",
//       description: "",
//       uploadimg: "",
//     },
//   });

//   const [open, setOpen] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // Submit
//   const onSubmit = (data: NewServicesType) => {
//     console.log("data", data);

//     toast.success(
//       preview ? "Services updated successfully" : "Service added successfully",
//     );

//     reset();
//     setPreview(null);
//     handleClose();
//   };

//   const handelToggle = (id: number) => {
//     // setIsChecked(isChacked === true ? false : true);
//     // setServiceStatus(serviceStatus === true ? false : true);

//     setServiceList((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, enabled: !item.enabled } : item,
//       ),
//     );
//   };

//   const handelEdit = (item: any) => {
//     setEditItem(item);

//     // prefill form
//     setValue("servicename", item.title);
//     setValue("description", item.description);
//     setValue("uploadimg", item.img);

//     setPreview(item.img);
//     handleOpen();
//   };

//   const handelDelete = (item) => {};

//   return (
//     <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography variant="h5" sx={{ color: "white" }}>
//           All Service Lists
//         </Typography>

//         <Button variant="contained" onClick={handleOpen}>
//           Add New Services
//         </Button>
//       </Box>

//       {/* click dialog */}
//       <Dialog
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         open={open}
//         onClose={handleClose}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogTitle sx={{}}>Add New Service</DialogTitle>

//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           {serviceInputField.map((field) => (
//             <DynamicInput
//               name={field?.name}
//               label={field?.label}
//               placeholder={field?.placeholder}
//               type={field?.type}
//               rows={field?.rows}
//               required={field.required}
//               register={register}
//               errors={errors}
//             />

//             // <TextField
//             // sx={{mt: 1}}
//             //   key={field.name}
//             //   label={field.label}
//             //   placeholder={field.placeholder}
//             //   multiline
//             //   rows={field.rows}
//             //   {...register(field.name)}
//             //   error={!!errors?.[field.name]}
//             //   helperText={errors?.[field.name]?.message}
//             // />
//           ))}

//           <Button variant="outlined" component="label">
//             {preview ? "Update Image" : "Upload Image"}
//             <input
//               type="file"
//               hidden
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 setValue("uploadimg", file);
//                 setPreview(URL.createObjectURL(file));
//               }}
//             />
//           </Button>

//           {preview && (
//             <Box
//               component="img"
//               src={preview}
//               sx={{
//                 width: 200,
//                 height: 200,
//                 objectFit: "cover",
//                 mx: "auto",
//                 borderRadius: 2,
//               }}
//             />
//           )}
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit" variant="contained">
//             {preview ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* display list of the available list */}
//       <Box
//         component="div"
//         sx={{
//           mt: 2,
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           gap: 2,
//           color: "white",
//         }}
//       >
//         {serviceList.map((item) => (
//           <Box
//             key={item.id}
//             sx={{
//               width: "315px",
//               position: "relative",
//               // opacity: item.enabled ? 1 : 0.5,
//               // transition: "0.3s",
//             }}
//           >
//             {/* ui data box */}
//             <Box
//               sx={{
//                 pointerEvents: item.enabled ? "disable" : "none",
//                 opacity: item.enabled ? 1 : 0.5,
//                 transition: "0.3s",
//               }}
//             >
//               <Box
//                 component="img"
//                 src={item?.img}
//                 sx={{ objectFit: "cover" }}
//               />
//               <Typography variant="h5">{item.title}</Typography>
//               <Typography variant="body2">{item.description}</Typography>
//             </Box>

//             <Stack
//               sx={{
//                 mt: 1,
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               {/* togglar  */}
//               <Box>
//                 <FormControlLabel
//                   label={item.enabled ? "Enable" : "Disable"}
//                   control={
//                     <Tooltip title={item.enabled ? "Disable" : "Enable"}>
//                       <Switch
//                         checked={item.enabled}
//                         onChange={() =>
//                           // setIsChecked(isChacked === true ? false : true)
//                           handelToggle(item.id)
//                         }
//                         color="primary"
//                       />
//                     </Tooltip>
//                   }
//                 />
//               </Box>

//               {/* action buttons */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   pointerEvents: item.enabled ? "disable" : "none",
//                   opacity: item.enabled ? 1 : 0.5,
//                   transition: "0.3s",
//                 }}
//               >
//                 <Tooltip title="Edit" onClick={() => handelEdit(item)}>
//                   <IconButton
//                     color="primary"
//                     aria-label="edit"
//                     sx={{ height: 35, width: 35, bgcolor: "#bbdefb" }}
//                   >
//                     <Pencil size={16} />
//                   </IconButton>
//                 </Tooltip>

//                 <Tooltip title="Delete" onClick={() => handelDelete(item)}>
//                   <IconButton
//                     color="error"
//                     aria-label="delete"
//                     sx={{ height: 35, width: 35, bgcolor: "#ffcdd2" }}
//                   >
//                     <Trash2 size={16} />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </Stack>
//           </Box>
//         ))}
//       </Box>
//     </Container>
//   );
// };

// export default ServicesManage;
