import {
  Box,
  Button,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { aboutTeams, services } from "../services/json/data.json";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { MoveRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

type FormValues = {
  service: string;
  doctor: string;
};

const Booking = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    // resolver: yupResolver(),
    defaultValues: {
      service: "",
      doctor: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA:", data);
  };

  return (
    <Container
      // disableGutters
      maxWidth={false}
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {/* ================= SERVICE ================= */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select Service
        </Typography>

        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              value={field.value}
              exclusive
              onChange={(_, val) => field.onChange(val || "")}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
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
          )}
        />

        {/* ================= DOCTOR ================= */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Select Doctor
        </Typography>

        <Controller
          name="doctor"
          control={control}
          render={({ field }) => (
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
                  const isSelected = field.value === item.id;

                  return (
                    <SwiperSlide key={item.id}>
                      <Box
                        onClick={() => field.onChange(item.id)}
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
                        {/* Image */}
                        <Box
                          component="img"
                          src={item.img}
                          alt={item.name}
                          loading="lazy"
                          className="img"
                          sx={{
                            width: "100%",
                            height: {
                              xs: 200,
                              sm: 220,
                              md: 240,
                              lg: 260,
                              xl: 280,
                            },
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                          }}
                        />

                        {/* Gradient */}
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)",
                          }}
                        />

                        {/* Name */}
                        <Typography
                          sx={{
                            position: "absolute",
                            bottom: 28,
                            left: 16,
                            color: "#fff",
                            fontSize: {
                              xs: 14,
                              sm: 16,
                              lg: 14,
                            },
                            fontWeight: 500,
                          }}
                        >
                          {item.name}
                        </Typography>

                        {/* Position */}
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
          )}
        />

        {/* ================= SUBMIT ================= */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Booking;
