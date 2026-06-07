import { Box, FormControl, FormHelperText } from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { FormValues } from "../../services/validation/booking.validation";
import type { BookingTimeType } from "../../type/interface/booking.interface";
import { Clock2, Clock9 } from "lucide-react";

interface BookingTimeProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  mergedDoctors: BookingTimeType[];
}

// Helper: get initials from doctor name
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

// Helper: format date string nicely
const formatDate = (dateStr: string) => {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const BookingTime = ({ control, errors, mergedDoctors }: BookingTimeProps) => {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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
          3
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
            Pick a date &amp; time
          </Box>
          <Box sx={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400 }}>
            All times shown in your local timezone
          </Box>
        </Box>
        <Box
          sx={{ flex: 1, height: "0.5px", backgroundColor: "#f0f0f0", ml: 1 }}
        />
      </Box>

      <Controller
        name="datetime"
        control={control}
        rules={{ required: "Please select a date and time" }}
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
                        border: "1.5px solid #e5e7eb",
                        borderRadius: "14px",
                        overflow: "hidden",
                        backgroundColor: "#fff",
                        transition: "border-color 0.15s",
                        "&:hover": { borderColor: "#9FE1CB" },
                      }}
                    >
                      {/* Doctor header strip */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          p: "14px 14px 12px",
                          borderBottom: "0.5px solid #f0f0f0",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        {/* Avatar */}
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            backgroundColor: "#9FE1CB",
                            color: "#085041",
                            fontSize: "13px",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(doctor.name)}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Box
                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#0d1b13",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {doctor.name}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "11px",
                              color: "#9ca3af",
                              fontWeight: 400,
                            }}
                          >
                            {doctor.position}
                          </Box>
                        </Box>
                      </Box>

                      {/* Slots */}
                      <Box
                        sx={{
                          p: "12px 14px 14px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {/* Slot 1 */}
                        {doctor.availability[0] && (
                          <Box>
                            {/* Date label */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                mb: "6px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#1D9E75",
                                  flexShrink: 0,
                                }}
                              />
                              <Box
                                sx={{
                                  fontSize: "11px",
                                  color: "#6b7280",
                                  fontWeight: 500,
                                }}
                              >
                                {formatDate(doctor.availability[0].date)}
                              </Box>
                            </Box>

                            {/* Slot button */}
                            <Box
                              component="button"
                              type="button"
                              onClick={() =>
                                field.onChange({
                                  doctorId: doctor.id,
                                  date: doctor.availability[0].date,
                                  time: doctor.availability[0].slots[0],
                                })
                              }
                              sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                border: "1.5px solid",
                                borderColor:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[0].date
                                    ? "#1D9E75"
                                    : "#e5e7eb",
                                borderRadius: "9px",
                                py: "9px",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                backgroundColor:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[0].date
                                    ? "#1D9E75"
                                    : "transparent",
                                color:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[0].date
                                    ? "#fff"
                                    : "#1D9E75",
                                transition: "all 0.15s",
                                fontFamily: "inherit",
                                "&:hover": {
                                  backgroundColor: "#E1F5EE",
                                  borderColor: "#1D9E75",
                                  color: "#0F6E56",
                                },
                              }}
                            >
                              <Clock9 size={15} />{" "}
                              {doctor.availability[0].slots[0]}
                            </Box>
                          </Box>
                        )}

                        {/* Slot 2 */}
                        {doctor.availability[1] && (
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                mb: "6px",
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#9FE1CB",
                                  flexShrink: 0,
                                }}
                              />
                              <Box
                                sx={{
                                  fontSize: "11px",
                                  color: "#6b7280",
                                  fontWeight: 500,
                                }}
                              >
                                {formatDate(doctor.availability[1].date)}
                              </Box>
                            </Box>

                            <Box
                              component="button"
                              type="button"
                              onClick={() =>
                                field.onChange({
                                  doctorId: doctor.id,
                                  date: doctor.availability[1].date,
                                  time: doctor.availability[1].slots[0],
                                })
                              }
                              sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                border: "1.5px solid",
                                borderColor:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[1].date
                                    ? "#1D9E75"
                                    : "#e5e7eb",
                                borderRadius: "9px",
                                py: "9px",
                                fontSize: "13px",
                                fontWeight: 600,
                                cursor: "pointer",
                                backgroundColor:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[1].date
                                    ? "#1D9E75"
                                    : "transparent",
                                color:
                                  field.value?.doctorId === doctor.id &&
                                  field.value?.date ===
                                    doctor.availability[1].date
                                    ? "#fff"
                                    : "#1D9E75",
                                transition: "all 0.15s",
                                fontFamily: "inherit",
                                "&:hover": {
                                  backgroundColor: "#E1F5EE",
                                  borderColor: "#1D9E75",
                                  color: "#0F6E56",
                                },
                              }}
                            >
                              <Clock2 size={15} />{" "}
                              {doctor.availability[1].slots[0]}
                            </Box>
                          </Box>
                        )}

                        {/* Empty state */}
                        {doctor.availability.length === 0 && (
                          <Box
                            sx={{
                              textAlign: "center",
                              py: 2,
                              fontSize: "12px",
                              color: "#9ca3af",
                            }}
                          >
                            No slots available
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>

            <FormHelperText
              sx={{ color: "#e24b4a", fontSize: "12px", mt: 0.75, ml: 0 }}
            >
              {errors.datetime?.message as string}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default BookingTime;
