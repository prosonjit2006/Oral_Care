import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Path } from "react-hook-form";
import DynamicInput from "../../components/DynamicInput";
import { toast } from "sonner";
import type { AppointmentPayload } from "../../type/interface/appointment.interface";
import {
  addNewAppointment,
  changeAppointmentStatus,
  deleteAppointment,
  editAppointment,
  fetchAppointmentList,
  setAppointmentDialogClose,
  setAppointmentDialogOpen,
  setEditAppointmentDialogOpen,
} from "../../store/slices/appointment.slice";
import { appointmentAddInputField } from "../../services/json/appointment.json";
import { fetchServiceList } from "../../store/slices/service.slice";
import { fetchDoctorList } from "../../store/slices/doctor.slice";
import ServiceDoctorDateTimeFields from "../../Section/admin/Servicedoctordatetimefields ";
import { appointmentSchema } from "../../services/validation/appointment.validation";
import { fetchPatientList } from "../../store/slices/patient.slice";

const AppointmentManage = () => {
  const { isLoading, isError, Appointments, dialog } = useAppSelector(
    (state) => state.appointment,
  );

  const { services } = useAppSelector((state) => state.service);
  const { doctors } = useAppSelector((state) => state.doctor);
  const { patients } = useAppSelector((state) => state.patient);

  console.log("doctors", doctors);

  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentPayload>({
    resolver: yupResolver(appointmentSchema) as any,
    defaultValues: {
      patientId: "",
      patientName: "",
      patientEmail: "",
      serviceName: "",
      doctorName: "",
      appointmentDate: "",
      appointmentTime: "",
      message: "",
      status: true,
    },
  });

  useEffect(() => {
    dispatch(fetchAppointmentList());
    dispatch(fetchServiceList());
    dispatch(fetchDoctorList());
    dispatch(fetchPatientList());
  }, [dispatch]);

  useEffect(() => {
    if (dialog.selectedAppointment) {
      reset({
        patientId: dialog.selectedAppointment.patientId,
        patientName: dialog.selectedAppointment.patientName,
        patientEmail: dialog.selectedAppointment.patientEmail,
        serviceName: dialog.selectedAppointment.serviceName,
        doctorName: dialog.selectedAppointment.doctorName,
        appointmentDate: dialog.selectedAppointment.appointmentDate,
        appointmentTime: dialog.selectedAppointment.appointmentTime,
        message: dialog.selectedAppointment.message,
        status: dialog.selectedAppointment.status,
      });
    } else {
      reset({
        patientId: "",
        patientName: "",
        patientEmail: "",
        serviceName: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        message: "",
        status: true,
      });
    }
  }, [dialog.selectedAppointment, dispatch, reset]);

  // * onsubmit
  const onSubmit = (data: AppointmentPayload) => {
    if (dialog.selectedAppointment) {
      dispatch(
        editAppointment({
          id: data.$id,
          data: data,
        }),
      ).unwrap();
      toast.success("Appointment Details Edited Successfully");
    } else {
      dispatch(addNewAppointment(data)).unwrap();
      toast.success("New Appointment Added Successfully");
    }
    dispatch(setAppointmentDialogClose());
    reset();
  };

 return (
   <Container
     disableGutters
     maxWidth={false}
     sx={{
       px: { xs: 1, sm: 2, md: 3, lg: 3, xl: 4 },
       py: 2,
     }}
   >
     {/* Header */}
     <Box
       sx={{
         display: "flex",
         flexDirection: { xs: "column", sm: "row" },
         justifyContent: "space-between",
         alignItems: { xs: "stretch", sm: "center" },
         gap: 2,
         mb: 3,
       }}
     >
       <Typography
         variant="h5"
         sx={{
           color: "white",
           fontSize: {
             xs: "1.25rem",
             sm: "1.4rem",
             md: "1.6rem",
           },
         }}
       >
         All Appointments Lists
       </Typography>

       <Button
         variant="contained"
         onClick={() => dispatch(setAppointmentDialogOpen())}
         sx={{
           width: {
             xs: "100%",
             sm: "fit-content",
           },
         }}
       >
         Add New Appointment
       </Button>
     </Box>

     {/* Dialog */}
     <Dialog
       component="form"
       onSubmit={handleSubmit(onSubmit)}
       open={dialog.open}
       onClose={() => dispatch(setAppointmentDialogClose())}
       fullWidth
       maxWidth="sm"
       slotProps={{
         paper: {
           sx: {
             width: {
               xs: "95%",
               sm: "90%",
               md: 600,
             },
           },
         },
       }}
     >
       <DialogTitle>
         {dialog.selectedAppointment
           ? "Edit Appointment"
           : "Add New Appointment"}
       </DialogTitle>

       <DialogContent
         sx={{
           display: "flex",
           flexDirection: "column",
           gap: 2,
           pt: 2,
         }}
       >
         <ServiceDoctorDateTimeFields
           register={register}
           watch={watch}
           setValue={setValue}
           errors={errors}
           patients={patients}
           services={services}
           doctors={doctors}
         />

         {dialog.selectedAppointment ? (
           <DynamicInput
             name="message"
             label="Message"
             placeholder="Update message or notes"
             type="text"
             rows={3}
             required={false}
             register={register}
             errors={errors}
           />
         ) : (
           appointmentAddInputField.map((field) => (
             <DynamicInput
               key={field.name}
               name={field.name as Path<AppointmentPayload>}
               label={field.label}
               placeholder={field.placeholder}
               type={field.type}
               rows={field.rows}
               required={field.required}
               register={register}
               errors={errors}
             />
           ))
         )}
       </DialogContent>

       <DialogActions
         sx={{
           px: 3,
           pb: 2,
           flexDirection: {
             xs: "column",
             sm: "row",
           },
           gap: 1,
         }}
       >
         <Button
           fullWidth
           onClick={() => dispatch(setAppointmentDialogClose())}
         >
           Cancel
         </Button>

         <Button fullWidth type="submit" variant="contained">
           {dialog.selectedAppointment ? "Update" : "Add"}
         </Button>
       </DialogActions>
     </Dialog>

     {/* Table */}
     {isLoading ? (
       <CircularProgress size={25} />
     ) : isError ? (
       <Typography>{isError}</Typography>
     ) : (
       <TableContainer
         sx={{
           width: "100%",
           overflowX: "auto",
           borderRadius: 2,
         }}
       >
         <Table
           aria-label="simple table"
           sx={{
             minWidth: {
               xs: 900,
               sm: 900,
               md: 1000,
               lg: 1100,
               xl: 1200,
             },
           }}
         >
           <TableHead>
             <TableRow>
               <TableCell>Patient Name</TableCell>
               <TableCell>Patient Email</TableCell>
               <TableCell>Service</TableCell>
               <TableCell>Doctor</TableCell>
               <TableCell align="center">Date</TableCell>
               <TableCell align="center">Time</TableCell>
               <TableCell align="center">Status</TableCell>
               <TableCell align="center">Action</TableCell>
             </TableRow>
           </TableHead>

           <TableBody>
             {Appointments?.map((row) => (
               <TableRow key={row.$id}>
                 <TableCell sx={{ whiteSpace: "nowrap" }}>
                   {row.patientName}
                 </TableCell>

                 <TableCell sx={{ whiteSpace: "nowrap" }}>
                   {row.patientEmail}
                 </TableCell>

                 <TableCell sx={{ whiteSpace: "nowrap" }}>
                   {row.serviceName}
                 </TableCell>

                 <TableCell sx={{ whiteSpace: "nowrap" }}>
                   {row.doctorName}
                 </TableCell>

                 <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                   {row.appointmentDate}
                 </TableCell>

                 <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                   {row.appointmentTime}
                 </TableCell>

                 <TableCell align="center">
                   <Tooltip title={row.status ? "Rejected" : "Approved"}>
                     <FormControlLabel
                       sx={{
                         m: 0,
                         flexDirection: {
                           xs: "column",
                           md: "row",
                         },
                         gap: 0.5,
                       }}
                       label={
                         <Typography
                           sx={{
                             fontSize: {
                               xs: "0.7rem",
                               sm: "0.8rem",
                             },
                           }}
                         >
                           {row.status ? "Approved" : "Rejected"}
                         </Typography>
                       }
                       control={
                         <Switch
                           size="small"
                           checked={row.status}
                           onChange={() =>
                             dispatch(
                               changeAppointmentStatus({
                                 id: row.$id,
                                 status: row.status,
                               }),
                             )
                           }
                         />
                       }
                     />
                   </Tooltip>
                 </TableCell>

                 <TableCell align="center">
                   <Box
                     sx={{
                       display: "flex",
                       justifyContent: "center",
                       gap: 1,
                     }}
                   >
                     <Tooltip title="Edit">
                       <IconButton
                         size="small"
                         onClick={() =>
                           dispatch(setEditAppointmentDialogOpen(row))
                         }
                         sx={{
                           bgcolor: "#bbdefb",
                           "&:hover": {
                             bgcolor: "#e3f2fd",
                           },
                         }}
                       >
                         <Pencil size={16} className="text-blue-700" />
                       </IconButton>
                     </Tooltip>

                     <Tooltip title="Delete">
                       <IconButton
                         size="small"
                         onClick={() => dispatch(deleteAppointment(row.$id))}
                         sx={{
                           bgcolor: "#ffcdd2",
                           "&:hover": {
                             bgcolor: "#ffebee",
                           },
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

export default AppointmentManage;
