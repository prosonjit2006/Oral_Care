import { Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { aboutTeams, services } from "../../services/json/data.json";
import "swiper/css";
import "swiper/css/pagination";
import { doctorAvailability } from "../../services/json/admin.json";
import {
  bookingFormSchema,
  type FormValues,
} from "../../services/validation/booking.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingFormInput } from "../../services/json/bookinfForm.input";
import { toast } from "sonner";
import BookingService from "../../Section/Booking/BookingService";
import BookingDoctor from "../../Section/Booking/BookingDoctor";
import BookingTime from "../../Section/Booking/BookingTime";
import BookingPersonalDetails from "../../Section/Booking/BookingPersonalDetails";

const ServicesData = ["Service", "Doctor", "Time", "Details"]

const Booking = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(bookingFormSchema),
    defaultValues: {
      service: "",
      doctor: {},
      datetime: {},
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Full Form Data:", data);
    toast.success("Appointment booked successfully");
    reset();
  };

  const mergedDoctors = aboutTeams.map((doc) => {
    const available = doctorAvailability.find((d) => d.doctorId === doc.id);
    return {
      ...doc,
      availability: available?.availability || [],
    };
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        py: "40px",
        px: { xs: "16px", md: "32px", lg: "48px" },
        backgroundColor: "#f8faf9",
        minHeight: "100vh",
      }}
    >
      {/* Page header */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#E1F5EE",
            color: "#0F6E56",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            px: 2,
            py: 0.75,
            borderRadius: "100px",
            mb: 1.5,
          }}
        >
          Schedule a visit
        </Box>
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "26px", md: "34px" },
            fontWeight: 600,
            color: "#0d1b13",
            mb: 1,
            mt: 0,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Book Your Appointment
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "15px",
            color: "#6b7280",
            fontWeight: 300,
            m: 0,
          }}
        >
          Choose your service, pick a doctor, and find a time that suits you.
        </Box>
      </Box>

      {/* Step progress */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          mb: 4,
        }}
      >
        {ServicesData.map((label, i) => (
          <Box
            key={label}
            sx={{ display: "flex", alignItems: "center", gap: 0 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "1.5px solid",
                  borderColor: i === 0 ? "#1D9E75" : "#d1d5db",
                  backgroundColor: i === 0 ? "#E1F5EE" : "transparent",
                  color: i === 0 ? "#0F6E56" : "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {i + 1}
              </Box>
              <Box
                sx={{
                  fontSize: "11px",
                  color: i === 0 ? "#0F6E56" : "#9ca3af",
                  fontWeight: 500,
                }}
              >
                {label}
              </Box>
            </Box>
            {i < 3 && (
              <Box
                sx={{
                  width: { xs: 32, sm: 48 },
                  height: "1.5px",
                  backgroundColor: "#e5e7eb",
                  mb: "16px",
                  mx: 0.5,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <BookingService control={control} errors={errors} services={services} />
        <BookingDoctor
          control={control}
          errors={errors}
          aboutTeams={aboutTeams}
        />
        <BookingTime
          control={control}
          errors={errors}
          mergedDoctors={mergedDoctors}
        />
        <BookingPersonalDetails
          bookingFormInput={bookingFormInput}
          register={register}
          errors={errors}
        />

        {/* Submit */}
        <Box
          sx={{
            mt: 3,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="button"
            type="submit"
            sx={{
              backgroundColor: "#1D9E75",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              px: "52px",
              py: "14px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              transition: "background 0.15s, transform 0.1s",
              fontFamily: "inherit",
              "&:hover": { backgroundColor: "#0F6E56" },
              "&:active": { transform: "scale(0.98)" },
            }}
          >
            Confirm Appointment
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              color: "#9ca3af",
              fontSize: "12px",
            }}
          >
            Your information is private and secure
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Booking;
