import { Box, MenuItem, TextField, Typography } from "@mui/material";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { AppointmentPayload } from "../../type/interface/appointment.interface";
import { getDoctorSchedule } from "../../services/json/appointment.json";
import type { Patient } from "../../type/interface/patient.interface";
import { serviceDoctorMap } from "../../services/json/serviceDoctorMap";

// interface Patient {
//   $id: string;
//   userId: string;
//   patientName: string;
//   patientEmail: string;
//   patientPhone: string;
//   gender?: string;
//   address?: string;
// }

interface Service {
  $id: string;
  servicename: string;
}

interface Doctor {
  $id?: string;
  id?: string;
  name: string;
  specialization?: string;
  service?: string;
  status?: boolean;
}

interface ServiceDoctorDateTimeFieldsProps {
  register: UseFormRegister<AppointmentPayload>;
  watch: UseFormWatch<AppointmentPayload>;
  setValue: UseFormSetValue<AppointmentPayload>;
  errors: FieldErrors<AppointmentPayload>;
  patients: Patient[];
  services: Service[];
  doctors: Doctor[];
}

const ServiceDoctorDateTimeFields = ({
  register,
  watch,
  setValue,
  errors,
  patients,
  services,
  doctors,
}: ServiceDoctorDateTimeFieldsProps) => {
  const patientId = watch("patientId");
  const serviceName = watch("serviceName");
  const doctorName = watch("doctorName");
  const appointmentDate = watch("appointmentDate");
  const appointmentTime = watch("appointmentTime");

  const filteredDoctors =
    serviceName.length > 0
      ? doctors.filter(
          (doctor) =>
            doctor.status &&
            serviceDoctorMap[serviceName]?.includes(doctor.name),
        )
      : [];

  //  console.table(
  //    doctors.map((doctor) => ({
  //      name: doctor.name,
  //      status: doctor.status,
  //      included: serviceDoctorMap[serviceName]?.includes(doctor.name),
  //    })),
  //  );

  const selectedDoctor = filteredDoctors.find(
    (doctor) => doctor.name === doctorName,
  );

  const schedule = getDoctorSchedule(selectedDoctor?.name);

  const availableDates = Object.keys(schedule);

  const selectedSlots =
    appointmentDate && schedule[appointmentDate]
      ? schedule[appointmentDate]
      : [];

  return (
    <>
      {/* Patient */}
      <TextField
        select
        fullWidth
        label="Patient"
        // value={patientId}
        error={!!errors.patientId}
        helperText={errors.patientId?.message}
        onChange={(e) => {
          const patient = patients.find((p) => p.$id === e.target.value);

          if (!patient) return;

          setValue("patientId", patient.$id, {
            shouldValidate: true,
          });

          setValue("patientId", patient.$id);

          setValue("patientName", patient.name);

          setValue("patientEmail", patient.email);

          setValue("serviceName", "");
          setValue("doctorName", "");
          setValue("appointmentDate", "");
          setValue("appointmentTime", "");
        }}
      >
        {patients.length > 0 ? (
          patients.map((patient) => (
            <MenuItem key={patient.$id} value={patient.$id}>
              {patient.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No patients available</MenuItem>
        )}
      </TextField>

      {/* Patient Preview */}
      {patientId && (
        <Box
          sx={{
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            mt: 1,
          }}
        >
          <Typography>Name: {watch("patientName")}</Typography>

          <Typography>Email: {watch("patientEmail")}</Typography>
        </Box>
      )}

      {/* Service */}
      <TextField
        {...register("serviceName")}
        select
        fullWidth
        label="Service"
        disabled={!patientId}
        value={serviceName}
        error={!!errors.serviceName}
        helperText={errors.serviceName?.message}
        sx={{ mt: 2 }}
        onChange={(e) => {
          setValue("serviceName", e.target.value, {
            shouldValidate: true,
          });

          setValue("doctorName", "");
          setValue("appointmentDate", "");
          setValue("appointmentTime", "");
        }}
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
        fullWidth
        disabled={!serviceName}
        label="Doctor"
        value={doctorName}
        error={!!errors.doctorName}
        helperText={errors.doctorName?.message}
        onChange={(e) => {
          setValue("doctorName", e.target.value, {
            shouldValidate: true,
          });

          setValue("appointmentDate", "");
          setValue("appointmentTime", "");
        }}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <MenuItem key={doctor.$id || doctor.id} value={doctor.name}>
              {doctor.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No doctors available</MenuItem>
        )}
      </TextField>

      {/* Date */}
      <TextField
        {...register("appointmentDate")}
        select
        fullWidth
        label="Appointment Date"
        disabled={!doctorName}
        value={appointmentDate}
        error={!!errors.appointmentDate}
        helperText={errors.appointmentDate?.message}
        onChange={(e) => {
          setValue("appointmentDate", e.target.value, {
            shouldValidate: true,
          });

          setValue("appointmentTime", "");
        }}
      >
        {availableDates.map((date) => (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        ))}
      </TextField>

      {/* Time */}
      <TextField
        {...register("appointmentTime")}
        select
        fullWidth
        label="Appointment Time"
        disabled={!appointmentDate}
        value={appointmentTime}
        error={!!errors.appointmentTime}
        helperText={errors.appointmentTime?.message}
        onChange={(e) =>
          setValue("appointmentTime", e.target.value, {
            shouldValidate: true,
          })
        }
      >
        {selectedSlots.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default ServiceDoctorDateTimeFields;
