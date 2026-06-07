import { Box } from "@mui/material";
import DynamicInput from "../../components/DynamicInput";
import type { FormValues } from "../../services/validation/booking.validation";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { BookingPersonalDetailsType } from "../../type/interface/booking.interface";

interface BookingPersonalDetailsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  bookingFormInput: BookingPersonalDetailsType[];
}

const BookingPersonalDetails = ({
  bookingFormInput,
  register,
  errors,
}: BookingPersonalDetailsProps) => {
  return (
    <Box
      sx={{
        maxWidth: 520,
        mx: "auto",
        mt: 0,
        mb: "20px",
      }}
    >
      {/* Card */}
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "0.5px solid #e5e7eb",
          borderRadius: "16px",
          p: { xs: "24px 20px", md: "28px 28px" },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          {/* Step badge */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "#E1F5EE",
              color: "#0F6E56",
              fontSize: "16px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5,
            }}
          >
            4
          </Box>
          <Box
            sx={{
              fontSize: { xs: "18px", md: "20px" },
              fontWeight: 600,
              color: "#0d1b13",
              mb: "4px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Your details
          </Box>
          <Box sx={{ fontSize: "13px", color: "#9ca3af", fontWeight: 300 }}>
            So we can confirm your appointment
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ height: "0.5px", backgroundColor: "#f0f0f0", mb: 2.5 }} />

        {/* Inputs rendered by DynamicInput — no changes to that component */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookingFormInput.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as keyof FormValues}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              rows={field.rows}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingPersonalDetails;
