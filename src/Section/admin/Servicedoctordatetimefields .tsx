import { MenuItem, TextField } from "@mui/material";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { AppointmentPayload } from "../../type/interface/appointment.interface";
import { getDoctorSchedule } from "../../services/json/appointment.json";

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
}

interface ServiceDoctorDateTimeFieldsProps {
  register: UseFormRegister<AppointmentPayload>;
  watch: UseFormWatch<AppointmentPayload>;
  setValue: UseFormSetValue<AppointmentPayload>;
  errors: FieldErrors<AppointmentPayload>;
  services: Service[];
  doctors: Doctor[];
}

// * Cascading Service -> Doctor -> Date -> Time selection fields
// * Each step resets and disables the following ones until a value is chosen.
const ServiceDoctorDateTimeFields = ({
  register,
  watch,
  setValue,
  errors,
  services,
  doctors,
}: ServiceDoctorDateTimeFieldsProps) => {
  const serviceTitle = watch("serviceTitle");
  const doctorName = watch("doctorName");
  const appointmentDate = watch("appointmentDate");

  // * doctors whose specialization/service matches the selected service
  const filteredDoctors = doctors.filter(
    (doctor) => (doctor.specialization || doctor.service) === serviceTitle,
  );

  const selectedDoctor = doctors.find((doctor) => doctor.name === doctorName);

  // * dummy schedule for now, keyed by doctor name
  const schedule = getDoctorSchedule(selectedDoctor?.name);

  const availableDates = Object.keys(schedule);

  const selectedSlots = appointmentDate ? schedule[appointmentDate] || [] : [];

  return (
    <>
      {/* Service */}
      <TextField
        {...register("serviceTitle")}
        select
        label="Service"
        fullWidth
        value={serviceTitle}
        onChange={(e) => {
          setValue("serviceTitle", e.target.value, { shouldValidate: true });
          setValue("doctorName", "");
          setValue("doctorId", "");
          setValue("appointmentDate", "");
          setValue("appointmentTime", "");
        }}
        error={!!errors.serviceTitle}
        helperText={errors.serviceTitle?.message}
        sx={{ mt: 1 }}
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
        value={doctorName}
        onChange={(e) => {
          const name = e.target.value;
          const doc = doctors.find((d) => d.name === name);
          setValue("doctorName", name, { shouldValidate: true });
          setValue("doctorId", doc?.$id || doc?.id || "");
          setValue("appointmentDate", "");
          setValue("appointmentTime", "");
        }}
        error={!!errors.doctorName}
        helperText={errors.doctorName?.message}
        disabled={!serviceTitle}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <MenuItem key={doctor.$id || doctor.id} value={doctor.name}>
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
        value={appointmentDate}
        onChange={(e) => {
          setValue("appointmentDate", e.target.value, {
            shouldValidate: true,
          });
          setValue("appointmentTime", "");
        }}
        error={!!errors.appointmentDate}
        helperText={errors.appointmentDate?.message}
        disabled={!doctorName}
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
        disabled={!appointmentDate}
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
    </>
  );
};

export default ServiceDoctorDateTimeFields;
