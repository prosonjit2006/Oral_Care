import { Box, TextField } from "@mui/material";
import type { FormValues } from "../../services/validation/booking.validation";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { BookingPersonalDetailsType } from "../../type/interface/booking.interface";
import { useEffect } from "react";

interface BookingPersonalDetailsProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  bookingFormInput: BookingPersonalDetailsType[];
  setValue: UseFormSetValue<FormValues>;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dob?: string;
    address?: string;
  };
}

// Fields that should be readonly when pre-filled
const READONLY_FIELDS = ["name", "email", "phone", "gender", "dob", "address"];

const BookingPersonalDetails = ({
  bookingFormInput,
  register,
  errors,
  setValue,
  user,
}: BookingPersonalDetailsProps) => {
  useEffect(() => {
    if (!user) return;
    const fields = [
      "name",
      "email",
      "phone",
      "gender",
      "dob",
      "address",
    ] as const;
    fields.forEach((key) => {
      if (user[key])
        setValue(key as keyof FormValues, user[key]!, {
          shouldValidate: false,
        });
    });
  }, [user, setValue]);

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", mt: 0, mb: "20px" }}>
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

        <Box sx={{ height: "0.5px", backgroundColor: "#f0f0f0", mb: 2.5 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {bookingFormInput.map((field) => {
            const isReadonlyField = READONLY_FIELDS.includes(field.name);
            const hasPrefilledValue = !!user?.[field.name as keyof typeof user];
            const isReadonly = isReadonlyField && hasPrefilledValue;
            const fieldKey = field.name as keyof FormValues;

            return (
              <Box key={field.name} sx={{ position: "relative" }}>
                <TextField
                  {...register(fieldKey)}
                  label={field.label}
                  placeholder={isReadonly ? undefined : field.placeholder}
                  type={field.type === "textarea" ? "text" : field.type}
                  multiline={field.type === "textarea"}
                  rows={
                    field.type === "textarea" ? (field.rows ?? 4) : undefined
                  }
                  required={field.required}
                  fullWidth
                  slotProps={{
                    input: { readOnly: isReadonly },
                    inputLabel: { shrink: true },
                  }}
                  error={!!errors[fieldKey]}
                  helperText={errors[fieldKey]?.message as string}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      fontSize: "14px",
                      backgroundColor: isReadonly ? "#f8faf9" : "#fff",
                      "& fieldset": {
                        borderColor: isReadonly ? "#e5e7eb" : "#d1d5db",
                      },
                      "&:hover fieldset": {
                        borderColor: isReadonly ? "#e5e7eb" : "#1D9E75",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1D9E75",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#1D9E75",
                    },
                    // Readonly styling — muted text + lock cursor
                    ...(isReadonly && {
                      "& .MuiOutlinedInput-input": {
                        color: "#6b7280",
                        cursor: "default",
                        WebkitTextFillColor: "#6b7280",
                      },
                    }),
                  }}
                />

                {/* Readonly badge */}
                {isReadonly && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "12px",
                      transform: "translateY(-50%)",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#1D9E75",
                      backgroundColor: "#E1F5EE",
                      px: "8px",
                      py: "3px",
                      borderRadius: "100px",
                      letterSpacing: "0.4px",
                      // push it up for multiline
                      ...(field.type === "textarea" && {
                        top: "18px",
                        transform: "none",
                      }),
                    }}
                  >
                    AUTO-FILLED
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default BookingPersonalDetails;
