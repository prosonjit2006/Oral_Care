import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { aboutTeams, services } from "../services/json/data.json";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { doctorAvailability } from "../services/json/admin.json";
import { bookingFormInput } from "../services/json/bookinfform.input";
import DynamicInput from "../components/DynamicInput";
import { bookingFormSchema } from "../services/validation/booking.validation";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  service: string;
  doctor: object;
  datetime: object;
  name: string;
  email: string;
  phone: string;
  message: string;
};

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
    reset();
  };

  // doctor and time marge
  const mergedDoctors = aboutTeams.map((doc) => {
    const availability = doctorAvailability.find((d) => d.doctorId === doc.id);

    return {
      ...doc,
      availability: availability?.availability || [],
    };
  });

  return (
    <Container
      // disableGutters
      maxWidth={false}
      sx={{ p: "25px 0" }}
    >
      {/* form part */}
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* service part */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Service
        </Typography>

        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.service} fullWidth>
              <ToggleButtonGroup
                exclusive
                value={field.value}
                onChange={(_, val) => field.onChange(val || "")}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  border: errors.service ? "1px solid red" : "none",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                {services.map((item) => (
                  <ToggleButton
                    key={item.id}
                    value={item.title}
                    sx={{
                      px: 3,
                      py: 1,
                      borderRadius: "12px !important",
                      border: "1px solid #ddd",
                      "&.Mui-selected": {
                        backgroundColor: "#1976d2",
                        color: "#fff",
                      },
                    }}
                  >
                    {item.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              {/* heper text */}
              <FormHelperText>
                {errors.service?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />

        {/* doctor select */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Select Doctor
        </Typography>

        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.doctor} fullWidth>
              <Box sx={{ width: "100%", minWidth: 0 }}>
                <Swiper
                  loop
                  freeMode
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 12 },
                    576: { slidesPerView: 2, spaceBetween: 14 },
                    768: { slidesPerView: 2, spaceBetween: 16 },
                    992: { slidesPerView: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 4, spaceBetween: 24 },
                    1400: { slidesPerView: 4, spaceBetween: 30 },
                  }}
                  modules={[FreeMode, Autoplay]}
                >
                  {aboutTeams.map((item) => {
                    const isSelected = field.value?.id === item.id;

                    return (
                      <SwiperSlide key={item.id}>
                        <Box
                          onClick={() => field.onChange(item)}
                          sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            cursor: "pointer",
                            width: "100%",

                            border: isSelected
                              ? "2px solid #1976d2"
                              : "1px solid #ddd",

                            transition: "all 0.3s ease",

                            "&:hover .img": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {/* img */}
                          <Box
                            component="img"
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            className="img"
                            sx={{
                              width: "100%",
                              height: {
                                xs: 380,
                                sm: 350,
                                md: 400,
                                lg: 320,
                                xl: 350,
                              },
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                            }}
                          />

                          {/* gradient */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)",
                            }}
                          />

                          {/* name */}
                          <Typography
                            sx={{
                              position: "absolute",
                              bottom: 28,
                              left: 16,
                              color: "#fff",
                              fontSize: {
                                xs: 14,
                                sm: 16,
                                lg: 24,
                              },
                              fontWeight: 500,
                            }}
                          >
                            {item.name}
                          </Typography>

                          {/* role */}
                          <Typography
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              left: 16,
                              color: "#fff",
                              fontSize: {
                                xs: 12,
                                sm: 14,
                                lg: 14,
                              },
                            }}
                          >
                            {item.position}
                          </Typography>

                          {/* Select Button */}
                          <Button
                            variant={isSelected ? "contained" : "outlined"}
                            onClick={(e) => {
                              e.stopPropagation();
                              field.onChange(item.id);
                            }}
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              right: 8,
                              textTransform: "none",
                              fontSize: 12,
                              px: 2,
                              py: 0.5,
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Button>
                        </Box>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
              {/* heper text */}
              <FormHelperText>
                {errors.doctor?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />

        {/* time and date select */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Select Time & Date
        </Typography>

        <Controller
          name="datetime"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.datetime} fullWidth>
              <Box sx={{ width: "100%" }}>
                <Swiper
                  loop
                  freeMode
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 12 },
                    576: { slidesPerView: 2, spaceBetween: 14 },
                    768: { slidesPerView: 2, spaceBetween: 16 },
                    992: { slidesPerView: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 4, spaceBetween: 24 },
                    1400: { slidesPerView: 4, spaceBetween: 30 },
                  }}
                  modules={[FreeMode, Autoplay]}
                >
                  {mergedDoctors.map((doctor) => (
                    <SwiperSlide key={doctor.id}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          border: "1px solid #ddd",
                          minHeight: 200,
                        }}
                      >
                        {/* doctor name */}
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {doctor.name}
                        </Typography>

                        {/* doctor role */}
                        <Typography sx={{ fontSize: 14, mb: 1 }}>
                          {doctor.position}
                        </Typography>

                        {/* SLOT 1 */}
                        {doctor.availability[0] && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              {doctor.availability[0].date}
                            </Typography>

                            <Button
                              fullWidth
                              variant={
                                field.value?.doctorId === doctor.id &&
                                field.value?.date ===
                                  doctor.availability[0].date
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() =>
                                field.onChange({
                                  doctorId: doctor.id,
                                  date: doctor.availability[0].date,
                                  time: doctor.availability[0].slots[0],
                                })
                              }
                              sx={{ mt: 1 }}
                            >
                              {doctor.availability[0].slots[0]}
                            </Button>
                          </Box>
                        )}

                        {/* SLOT 2 */}
                        {doctor.availability[1] && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2">
                              {doctor.availability[1].date}
                            </Typography>

                            <Button
                              fullWidth
                              variant={
                                field.value?.doctorId === doctor.id &&
                                field.value?.date ===
                                  doctor.availability[1].date
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() =>
                                field.onChange({
                                  doctorId: doctor.id,
                                  date: doctor.availability[1].date,
                                  time: doctor.availability[1].slots[0],
                                })
                              }
                              sx={{ mt: 1 }}
                            >
                              {doctor.availability[1].slots[0]}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>

              {/* heper text */}
              <FormHelperText sx={{ color: "red" }}>
                {errors.datetime?.message as string}
              </FormHelperText>
            </FormControl>
          )}
        />

        {/* personal details */}

        <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 4,
            p: 3,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 1,
              textAlign: "center",
            }}
          >
            Book Appointment
          </Typography>

          {/* Inputs */}
          {bookingFormInput.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name}
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

        {/* ================= SUBMIT ================= */}
        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Booking;
