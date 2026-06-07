import { Box, FormControl, FormHelperText } from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { FormValues } from "../../services/validation/booking.validation";
import type { BookingServiceType } from "../../type/interface/booking.interface";
import {
  Stethoscope,
  Sparkles,
  Syringe,
  Baby,
  type LucideIcon,
  Check,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "General Checkups": Stethoscope,
  "Teeth Whitening": Sparkles,
  "Root Canal & Surgery": Syringe,
  "Kids Dental Care": Baby,
};

interface BookingServiceProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  services: BookingServiceType[];
}

const BookingService = ({ control, errors, services }: BookingServiceProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        border: "0.5px solid #e5e7eb",
        borderRadius: "16px",
        p: { xs: "20px", md: "24px" },
        mb: "20px",
      }}
    >
      {/* Section label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "#E1F5EE",
            color: "#0F6E56",
            fontSize: "13px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          1
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#0d1b13",
              lineHeight: 1.2,
            }}
          >
            Select a service
          </Box>
          <Box sx={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400 }}>
            What are you coming in for?
          </Box>
        </Box>
        <Box
          sx={{ flex: 1, height: "0.5px", backgroundColor: "#f0f0f0", ml: 1 }}
        />
      </Box>

      <Controller
        name="service"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.service} fullWidth>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {services.map((item) => {
                const isSelected = field.value === item.title;
                const Icon = SERVICE_ICONS[item.title];

                return (
                  <Box
                    key={item.id}
                    component="button"
                    type="button"
                    onClick={() => field.onChange(isSelected ? "" : item.title)}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      border: "1.5px solid",
                      borderColor: isSelected ? "#1D9E75" : "#e5e7eb",
                      borderRadius: "100px",
                      px: "18px",
                      py: "9px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#E1F5EE" : "#fff",
                      color: isSelected ? "#085041" : "#6b7280",
                      transition: "all 0.15s",
                      fontFamily: "inherit",
                      "&:hover": {
                        borderColor: "#1D9E75",
                        color: "#0F6E56",
                        backgroundColor: isSelected ? "#E1F5EE" : "#f6fdfb",
                      },
                    }}
                  >
                    {Icon && <Icon size={16} strokeWidth={2} />}

                    {item.title}

                    {isSelected && (
                      <Box
                        component="span"
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: "#1D9E75",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "10px",
                          ml: "2px",
                        }}
                      >
                        <Check size={13} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>

            <FormHelperText
              sx={{
                color: "#e24b4a",
                fontSize: "12px",
                mt: 1,
                ml: 0,
              }}
            >
              {errors.service?.message as string}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default BookingService;
