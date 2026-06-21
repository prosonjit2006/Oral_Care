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
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          All Appointments Lists
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(setAppointmentDialogOpen())}
        >
          Add New Appointment
        </Button>
      </Box>

      {/* dialog */}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setAppointmentDialogClose())}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialog.selectedAppointment
            ? "Edit Appointment"
            : "Add New Appointment"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* * Shared cascading Service -> Doctor -> Date -> Time fields,
              used for both Add and Edit flows */}
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
            // * Edit mode — only Message is shown beyond the cascading fields
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
            // * Add mode — full set of patient detail fields
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

        <DialogActions>
          <Button onClick={() => dispatch(setAppointmentDialogClose())}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {dialog.selectedAppointment ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* table ui part */}
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <>
          {isError ? (
            <Typography>{isError}</Typography>
          ) : (
            <TableContainer>
              <Table
                sx={{ minWidth: 650, color: "#fff" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Patient Name</TableCell>
                    <TableCell align="left">Patient Email</TableCell>
                    <TableCell align="left">Service</TableCell>
                    <TableCell align="left">Doctor</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Appointments?.map((row) => (
                    <TableRow
                      key={row.$id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{row.patientName}</TableCell>
                      <TableCell>{row.patientEmail}</TableCell>
                      <TableCell>{row.serviceName}</TableCell>
                      <TableCell>{row.doctorName}</TableCell>
                      <TableCell>{row.appointmentDate}</TableCell>
                      <TableCell>{row.appointmentTime}</TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          pointerEvents: "visible",
                          opacity: 1,
                          color: "white",
                        }}
                      >
                        <Tooltip title={row.status ? "Rejected" : "Approved"}>
                          <FormControlLabel
                            label={row.status ? "Approved" : "Rejected"}
                            control={
                              <Switch
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

                      <TableCell align="center" sx={{ marginLeft: "10px " }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() =>
                                dispatch(setEditAppointmentDialogOpen(row))
                              }
                              sx={{
                                bgcolor: "#bbdefb",
                                "&:hover": { bgcolor: "#e3f2fd" },
                                pointerEvents: "visible",
                                opacity: 1,
                              }}
                            >
                              <Pencil size={16} className="text-blue-700" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() =>
                                dispatch(deleteAppointment(row.$id))
                              }
                              sx={{
                                bgcolor: "#ffcdd2",
                                "&:hover": { bgcolor: "#ffebee" },
                                pointerEvents: "visible",
                                opacity: 1,
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
        </>
      )}
    </Container>
  );
};

export default AppointmentManage;
