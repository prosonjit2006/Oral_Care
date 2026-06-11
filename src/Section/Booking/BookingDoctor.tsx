import { Box, FormControl, FormHelperText } from "@mui/material";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { FormValues } from "../../services/validation/booking.validation";
import type { BookingDoctorType } from "../../type/interface/booking.interface";
import { Check } from "lucide-react";

interface BookingDoctorProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  aboutTeams: BookingDoctorType[];
  selectedService: string;
  
}

const BookingDoctor = ({
  control,
  errors,
  aboutTeams,
  selectedService,
}: BookingDoctorProps) => {
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
          2
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
            Choose your doctor
          </Box>
          <Box sx={{ fontSize: "12px", color: "#9ca3af", fontWeight: 400 }}>
            Our specialists are ready to help
          </Box>
        </Box>
        <Box
          sx={{ flex: 1, height: "0.5px", backgroundColor: "#f0f0f0", ml: 1 }}
        />
      </Box>

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

                  //  ! initials fallback
                  // const initials = item.name
                  //   .split(" ")
                  //   .map((n: string) => n[0])
                  //   .slice(0, 2)
                  //   .join("")
                  //   .toUpperCase();

                  // If a service is chosen, check if this doctor handles it
                  const isCompatible =
                    !selectedService ||
                    !item.services ||
                    item.services.includes(selectedService);

                  return (
                    <SwiperSlide key={item.id}>
                      <Box
                        onClick={() => isCompatible && field.onChange(item)}
                        sx={{
                          position: "relative",
                          borderRadius: "14px",
                          overflow: "hidden",
                          cursor: "pointer",
                          width: "100%",
                          border: "1.5px solid",
                          borderColor: isSelected ? "#1D9E75" : "#e5e7eb",
                          // transition: "all 0.2s ease",
                          backgroundColor: isSelected ? "#E1F5EE" : "#fff",
                          "&:hover": {
                            borderColor: "#1D9E75",
                          },
                          "&:hover .doc-img": {
                            transform: "scale(1.05)",
                          },

                          opacity: isCompatible ? 1 : 0.35, // ← dim incompatible
                          pointerEvents: isCompatible ? "auto" : "none", // ← disable click
                          filter: isCompatible ? "none" : "grayscale(40%)", // ← subtle grey
                          transition: "all 0.2s ease",
                        }}
                      >
                        {/* Selected badge */}
                        {isSelected && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              zIndex: 10,
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              backgroundColor: "#1D9E75",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            <Check size={17} />
                          </Box>
                        )}

                        {/* Image with overlay */}
                        <Box sx={{ position: "relative", overflow: "hidden" }}>
                          <Box
                            component="img"
                            src={item.img}
                            alt={item.name}
                            loading="lazy"
                            className="doc-img"
                            sx={{
                              width: "100%",
                              height: {
                                xs: 280,
                                sm: 260,
                                md: 300,
                                lg: 260,
                                xl: 280,
                              },
                              objectFit: "cover",
                              display: "block",
                              transition: "transform 0.45s ease",
                            }}
                          />
                          {/* Dark overlay gradient */}
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(to top, rgba(4,52,44,0.82) 0%, rgba(4,52,44,0.3) 50%, transparent 100%)",
                            }}
                          />
                          {/* Name + role on image */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              p: "14px 14px 12px",
                            }}
                          >
                            <Box
                              sx={{
                                fontSize: { xs: 14, sm: 15, lg: 16 },
                                fontWeight: 600,
                                color: "#fff",
                                lineHeight: 1.2,
                                mb: "3px",
                              }}
                            >
                              {item.name}
                            </Box>
                            <Box
                              sx={{
                                fontSize: "12px",
                                color: "rgba(255,255,255,0.75)",
                                fontWeight: 400,
                              }}
                            >
                              {item.position}
                            </Box>
                          </Box>
                        </Box>

                        {/* Bottom action row */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: "14px",
                            py: "10px",
                          }}
                        >
                          {/* Availability pill */}
                          <Box
                            sx={{
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "#1D9E75",
                              backgroundColor: "#E1F5EE",
                              px: "10px",
                              py: "4px",
                              borderRadius: "100px",
                            }}
                          >
                            Available
                          </Box>

                          {/* Select button */}
                          <Box
                            component="button"
                            type="button"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              field.onChange(item);
                            }}
                            sx={{
                              border: "1.5px solid",
                              borderColor: isSelected ? "#1D9E75" : "#e5e7eb",
                              borderRadius: "8px",
                              px: "14px",
                              py: "6px",
                              fontSize: "12px",
                              fontWeight: 600,
                              cursor: "pointer",
                              backgroundColor: isSelected
                                ? "#1D9E75"
                                : "transparent",
                              color: isSelected ? "#fff" : "#374151",
                              transition: "all 0.15s",
                              fontFamily: "inherit",
                              "&:hover": {
                                backgroundColor: isSelected
                                  ? "#0F6E56"
                                  : "#f6fdfb",
                                borderColor: "#1D9E75",
                                color: isSelected ? "#fff" : "#0F6E56",
                              },
                            }}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </Box>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>

            <FormHelperText
              sx={{ color: "#e24b4a", fontSize: "12px", mt: 0.75, ml: 0 }}
            >
              {errors.doctor?.message as string}
            </FormHelperText>
          </FormControl>
        )}
      />
    </Box>
  );
};

export default BookingDoctor;
