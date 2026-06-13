import { Box, Container, Typography } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
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
// import { toast } from "sonner";
import BookingService from "../../Section/Booking/BookingService";
import BookingDoctor from "../../Section/Booking/BookingDoctor";
import BookingTime from "../../Section/Booking/BookingTime";
import BookingPersonalDetails from "../../Section/Booking/BookingPersonalDetails";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import {
  bookedService,
  fetchPaitentData,
} from "../../store/slices/booking.slice";
import { Check } from "lucide-react";
import { serviceCheckout } from "../../lib/service.stripe";

const ServicesData = ["Service", "Doctor", "Time", "Details"];

const userCookie = Cookies.get("user");
const user = userCookie ? JSON.parse(userCookie) : null;

const Booking = () => {
  const dispatch = useAppDispatch();
  const { patient } = useAppSelector((state) => state.booking);

  console.log("patient", patient);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
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

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchPaitentData(user.email));
    }
  }, [dispatch]);

  // Watch selected service and doctor
  const selectedService = useWatch({ control, name: "service" });
  const selectedDoctor = useWatch({ control, name: "doctor" });
  const selectedTime = useWatch({ control, name: "datetime" });

  // Derive active step from selections
  const activeStep = (() => {
    if (selectedTime?.date) return 3; // Details visible
    if (selectedDoctor?.id) return 2; // Time visible
    if (selectedService) return 1; // Doctor visible
    return 0; // Only service visible
  })();

  // Mock logged-in user (replace with real Redux/auth selector)
  const loggedInUser = {
    name: patient?.name,
    email: patient?.email,
    phone: patient?.phone,
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Full Form Data:", data);
    dispatch(
      bookedService({
        serviceTitle: data.service,
        doctorId: data.doctor.id,
        doctorName: data.doctor.name,
        appointmentDate: data.datetime.date,
        appointmentTime: data.datetime.time,
        patientName: data.name,
        patientEmail: data.email,
        patientPhone: data.phone,
        message: data.message || "",
        status: false,
        userId: user?.$id ?? null,
      }),
    );
    // toast.success("Appointment booked successfully");
   await serviceCheckout();
    reset();
  };

  const mergedDoctors = aboutTeams.map((doc) => {
    const available = doctorAvailability.find((d) => d.doctorId === doc.id);
    return {
      ...doc,
      availability: available?.availability || [],
    };
  });

  // ! return part starts from here
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
                  borderColor: i <= activeStep ? "#1D9E75" : "#d1d5db", // ← was i === 0
                  backgroundColor: i <= activeStep ? "#E1F5EE" : "transparent", // ← was i === 0
                  color: i <= activeStep ? "#0F6E56" : "#9ca3af", // ← was i === 0
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {i < activeStep ? <Check size={14} /> : i + 1}{" "}
                {/* ← tick on completed steps */}
              </Box>
              <Box
                sx={{
                  fontSize: "11px",
                  color: i <= activeStep ? "#0F6E56" : "#9ca3af",
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
                  backgroundColor: i < activeStep ? "#1D9E75" : "#e5e7eb", // ← connector fills too
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
        {/* Step 1 — always visible */}
        <BookingService control={control} errors={errors} services={services} />

        {/* Step 2 — visible after service selected */}
        {activeStep >= 0 && (
          <BookingDoctor
            control={control}
            errors={errors}
            aboutTeams={aboutTeams}
            selectedService={selectedService}
          />
        )}

        {/* Step 3 — visible after doctor selected */}
        {activeStep >= 2 && (
          <BookingTime
            control={control}
            errors={errors}
            mergedDoctors={mergedDoctors}
            selectedDoctorId={selectedDoctor?.id ?? null}
          />
        )}

        {/* Step 4 — visible after time selected */}
        {activeStep >= 3 && (
          <BookingPersonalDetails
            bookingFormInput={bookingFormInput}
            register={register}
            errors={errors}
            setValue={setValue}
            user={loggedInUser}
          />
        )}

        {/* Submit */}
        {activeStep >= 3 && (
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

          <Typography variant="body1" sx={{textAlign: 'center', mb: 1}}>Pay Booking Amount To Confirm Appointment </Typography>

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
              Pay Amount
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
        )}
      </Box>
    </Container>
  );
};

export default Booking;
