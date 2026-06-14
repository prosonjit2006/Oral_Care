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
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import DynamicInput from "../../components/DynamicInput";
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
import { appointmentSchema } from "../../services/validation/appointment.validation";
import {
  appointmentAddInputField,
  doctors,
  
} from "../../services/json/appointment.json";

const AppointmentManage = () => {
  const { isLoading, isError, Appointments, dialog } = useAppSelector(
    (state) => state.appointment,
  );

  const {services} = useAppSelector((state)=> state.service)

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
      serviceTitle: "",
      doctorId: "",
      doctorName: "",
      appointmentDate: "",
      appointmentTime: "",
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      message: "",
      status: false,
      userId: "",
    },
  });

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.service === watch("serviceTitle"),
  );
  const selectedDoctor = doctors.find(
    (doctor) => doctor.name === watch("doctorName"),
  );
  const availableDates = selectedDoctor
    ? Object.keys(selectedDoctor.schedule)
    : [];

  const selectedSlots =
    selectedDoctor?.schedule?.[
      watch("appointmentDate") as keyof typeof selectedDoctor.schedule
    ] || [];

  useEffect(() => {
    dispatch(fetchAppointmentList());
  }, [dispatch]);

  useEffect(() => {
    if (dialog.selectedAppointment) {
      reset({
        serviceTitle: dialog.selectedAppointment.serviceTitle,
        doctorId: dialog.selectedAppointment.doctorId,
        doctorName: dialog.selectedAppointment.doctorName,
        appointmentDate: dialog.selectedAppointment.appointmentDate,
        appointmentTime: dialog.selectedAppointment.appointmentTime,
        patientName: dialog.selectedAppointment.patientName,
        patientEmail: dialog.selectedAppointment.patientEmail,
        patientPhone: dialog.selectedAppointment.patientPhone,
        message: dialog.selectedAppointment.message,
        status: dialog.selectedAppointment.status,
        userId: dialog.selectedAppointment.userId,
      });
    } else {
      reset({
        serviceTitle: "",
        doctorId: "",
        doctorName: "",
        appointmentDate: "",
        appointmentTime: "",
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        message: "",
        status: false,
        userId: "",
      });
    }
  }, [dialog.selectedAppointment, dispatch, reset]);

  // * onsubmit
  const onSubmit = (data: AppointmentPayload) => {
    // console.log('data on submit ', data)
    if (dialog.selectedAppointment) {
      // console.log('updating data')
      dispatch(
        editAppointment({
          id: data.id,
          data: data,
        }),
      ).unwrap();
      // dispatch(fetchAppointmentList());
      // dispatch(setAppointmentDialogClose());
      toast.success("Appointment Details Edited Successfully");
    } else {
      dispatch(
        addNewAppointment({
          ...data,
          doctorId: selectedDoctor?.id || "",
        }),
      ).unwrap();
      // dispatch(fetchAppointmentList());
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

      {/* dialog*/}
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
          {dialog.selectedAppointment ? (
            <>
              {/* Service */}
              <TextField
                {...register("serviceTitle")}
                select
                label="Service"
                fullWidth
                value={watch("serviceTitle")}
                onChange={(e) => {
                  setValue("serviceTitle", e.target.value, {
                    shouldValidate: true,
                  });
                  setValue("doctorName", "");
                  setValue("doctorId", "");
                  setValue("appointmentDate", "");
                  setValue("appointmentTime", "");
                }}
                error={!!errors.serviceTitle}
                helperText={errors.serviceTitle?.message}
              >
                {services.map((service) => (
                  <MenuItem key={service.$id} value={service.servicename}>
                    {service.servicename}
                  </MenuItem>
                ))}
              </TextField>

              {/* Doctor */}
              <TextField
                {...register("doctorName")}
                select
                label="Doctor"
                fullWidth
                value={watch("doctorName")}
                onChange={(e) => {
                  const name = e.target.value;
                  const doc = doctors.find((d) => d.name === name);
                  setValue("doctorName", name, { shouldValidate: true });
                  setValue("doctorId", doc?.id || "");
                  setValue("appointmentDate", "");
                  setValue("appointmentTime", "");
                }}
                error={!!errors.doctorName}
                helperText={errors.doctorName?.message}
                disabled={!watch("serviceTitle")}
              >
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a service first
                  </MenuItem>
                )}
              </TextField>

              {/* Date */}
              <TextField
                {...register("appointmentDate")}
                select
                label="Appointment Date"
                fullWidth
                value={watch("appointmentDate")}
                onChange={(e) => {
                  setValue("appointmentDate", e.target.value, {
                    shouldValidate: true,
                  });
                  setValue("appointmentTime", "");
                }}
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate?.message}
                disabled={!watch("doctorName")}
              >
                {availableDates.length > 0 ? (
                  availableDates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a doctor first
                  </MenuItem>
                )}
              </TextField>

              {/* Time */}
              <TextField
                {...register("appointmentTime")}
                select
                label="Appointment Time"
                fullWidth
                value={watch("appointmentTime")}
                onChange={(e) =>
                  setValue("appointmentTime", e.target.value, {
                    shouldValidate: true,
                  })
                }
                error={!!errors.appointmentTime}
                helperText={errors.appointmentTime?.message}
                disabled={!watch("appointmentDate")}
              >
                {selectedSlots.length > 0 ? (
                  selectedSlots.map((time: string) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a date first
                  </MenuItem>
                )}
              </TextField>

              {/* Message only — no status */}
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
            </>
          ) : (
            // ! Add appointment part starts from here
            <>
              {/* Service */}
              <TextField
                {...register("serviceTitle")}
                select
                label="Service"
                fullWidth
                value={watch("serviceTitle")}
                onChange={(e) => {
                  setValue("serviceTitle", e.target.value, {
                    shouldValidate: true,
                  });
                  setValue("doctorName", "");
                  setValue("appointmentDate", "");
                  setValue("appointmentTime", "");
                }}
                error={!!errors.serviceTitle}
                helperText={errors.serviceTitle?.message}
              >
                {services.map((service) => (
                  <MenuItem key={service.$id} value={service.servicename}>
                    {service.servicename}
                  </MenuItem>
                ))}
              </TextField>

              {/* Doctor */}
              <TextField
                {...register("doctorName")}
                select
                label="Doctor"
                fullWidth
                value={watch("doctorName")}
                onChange={(e) => {
                  const name = e.target.value;
                  const doc = doctors.find((d) => d.name === name);
                  setValue("doctorName", name, { shouldValidate: true });
                  setValue("doctorId", doc?.id || "");
                  setValue("appointmentDate", "");
                  setValue("appointmentTime", "");
                }}
                error={!!errors.doctorName}
                helperText={errors.doctorName?.message}
                disabled={!watch("serviceTitle")}
              >
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a service first
                  </MenuItem>
                )}
              </TextField>

              {/* Date */}
              <TextField
                {...register("appointmentDate")}
                select
                label="Appointment Date"
                fullWidth
                value={watch("appointmentDate")}
                onChange={(e) => {
                  setValue("appointmentDate", e.target.value, {
                    shouldValidate: true,
                  });
                  setValue("appointmentTime", "");
                }}
                error={!!errors.appointmentDate}
                helperText={errors.appointmentDate?.message}
                disabled={!watch("doctorName")}
              >
                {availableDates.length > 0 ? (
                  availableDates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {date}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a doctor first
                  </MenuItem>
                )}
              </TextField>

              {/* Time */}
              <TextField
                {...register("appointmentTime")}
                select
                label="Appointment Time"
                fullWidth
                value={watch("appointmentTime")}
                onChange={(e) =>
                  setValue("appointmentTime", e.target.value, {
                    shouldValidate: true,
                  })
                }
                error={!!errors.appointmentTime}
                helperText={errors.appointmentTime?.message}
                disabled={!watch("appointmentDate")}
              >
                {selectedSlots.length > 0 ? (
                  selectedSlots.map((time: string) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    Select a date first
                  </MenuItem>
                )}
              </TextField>

              {appointmentAddInputField.map((field) => (
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
              ))}
            </>
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
          {/* is error part  */}
          {isError ? (
            <Typography>{isError}</Typography>
          ) : (
            // actual table part
            <TableContainer>
              <Table
                sx={{ minWidth: 650, color: "#fff" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Service</TableCell>
                    <TableCell align="left">Doctor</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Patient Name</TableCell>
                    <TableCell align="center">Patient Email</TableCell>
                    <TableCell align="center">Patient Phone</TableCell>
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
                        // pointerEvents: row.status ? "auto" : "none",
                        // opacity: row.status ? 1 : 0.5,
                      }}
                    >
                      <TableCell>{row.serviceTitle}</TableCell>

                      <TableCell>{row.doctorName}</TableCell>

                      <TableCell>{row.appointmentDate}</TableCell>

                      <TableCell>{row.appointmentTime}</TableCell>

                      <TableCell>{row.patientName}</TableCell>

                      <TableCell>{row.patientEmail}</TableCell>

                      <TableCell>{row.patientPhone}</TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          pointerEvents: "visible",
                          opacity: row.status ? 1 : 1,
                          color: "white",
                        }}
                      >
                        <Tooltip title={row.status ? "Rejected" : "Apptoved"}>
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
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
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
