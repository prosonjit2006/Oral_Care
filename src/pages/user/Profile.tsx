import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import {
  Pencil,
  CalendarDays,
  History,
  BarChart2,
  Pill,
  LogOut,
  Lock,
  Trash2,
  Clock,
  User,
  Hospital,
} from "lucide-react";

const stats = [
  { label: "Upcoming", value: 3, color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Completed", value: 12, color: "#10B981", bg: "#ECFDF5" },
  { label: "Reports", value: 4, color: "#8B5CF6", bg: "#F5F3FF" },
  { label: "Prescriptions", value: 2, color: "#F59E0B", bg: "#FFFBEB" },
];

const appointments = [
  {
    doctor: "Dr. Sarah Wilson",
    specialty: "Dentist",
    service: "Dental Cleaning",
    date: "12 June 2026",
    time: "10:00 AM",
    avatar: "SW",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    doctor: "Dr. Michael Brown",
    specialty: "General",
    service: "Tooth Checkup",
    date: "20 June 2026",
    time: "02:30 PM",
    avatar: "MB",
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
];

const quickActions = [
  {
    label: "Book Appointment",
    icon: <CalendarDays size={16} />,
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  {
    label: "Medical History",
    icon: <History size={16} />,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Reports",
    icon: <BarChart2 size={16} />,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    label: "Prescriptions",
    icon: <Pill size={16} />,
    color: "#F59E0B",
    bg: "#FFFBEB",
  },
];

const cardSx = {
  elevation: 0,
  sx: {
    borderRadius: "16px",
    border: "1px solid #F1F5F9",
    boxShadow: "0 1px 3px rgba(15,23,42,0.04), 0 4px 16px rgba(15,23,42,0.04)",
    transition: "box-shadow 0.2s ease",
    "&:hover": { boxShadow: "0 4px 20px rgba(15,23,42,0.08)" },
  },
};

const Profile = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* ── HERO CARD ── */}
          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
              background:
                "linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #1E40AF 100%)",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -40,
                left: "35%",
                width: 180,
                height: 180,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.03)",
                pointerEvents: "none",
              }}
            />

            <Box sx={{ p: { xs: 3, md: 5 }, position: "relative" }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      width: 96,
                      height: 96,
                      fontSize: "2rem",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #60A5FA, #818CF8)",
                      border: "3px solid rgba(255,255,255,0.15)",
                      letterSpacing: "-1px",
                    }}
                  >
                    PD
                  </Avatar>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: "#10B981",
                      border: "2px solid #0F172A",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 0.5 }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "1.5rem", md: "1.75rem" },
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      Prosonjit Das
                    </Typography>
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        bgcolor: "rgba(16,185,129,0.2)",
                        color: "#6EE7B7",
                        fontWeight: 600,
                        fontSize: "11px",
                        height: 22,
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    />
                  </Stack>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 0.5, sm: 3 }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.875rem",
                      }}
                    >
                      prosonjit@gmail.com
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.6)",
                        fontSize: "0.875rem",
                      }}
                    >
                      +91 9876543210
                    </Typography>
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.45)",
                        fontSize: "0.875rem",
                      }}
                    >
                      Patient ID: OC-10234
                    </Typography>
                  </Stack>
                </Box>

                <Button
                  startIcon={<Pencil size={14} />}
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.25)",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 500,
                    backdropFilter: "blur(8px)",
                    backgroundColor: "rgba(255,255,255,0.07)",
                    px: 2,
                    "&:hover": {
                      borderColor: "rgba(255,255,255,0.5)",
                      backgroundColor: "rgba(255,255,255,0.12)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Stack>
            </Box>
          </Card>

          {/* ── STATS ── */}
          <Grid container spacing={2}>
            {stats.map((item) => (
              <Grid size={{ xs: 6, md: 3 }} key={item.label}>
                <Card {...cardSx}>
                  <CardContent sx={{ p: "20px !important" }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: item.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: item.color,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: "#64748B",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* ── QUICK ACTIONS ── */}
          <Card {...cardSx}>
            <CardContent sx={{ p: "24px !important" }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#94A3B8",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Quick Actions
              </Typography>
              <Grid container spacing={1.5}>
                {quickActions.map((action) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={action.label}>
                    <Button
                      fullWidth
                      startIcon={
                        <Box sx={{ color: action.color, display: "flex" }}>
                          {action.icon}
                        </Box>
                      }
                      sx={{
                        py: 1.5,
                        borderRadius: "12px",
                        bgcolor: action.bg,
                        color: action.color,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        justifyContent: "flex-start",
                        px: 2,
                        border: `1px solid ${action.color}20`,
                        "&:hover": {
                          bgcolor: action.bg,
                          filter: "brightness(0.95)",
                        },
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* ── MAIN GRID ── */}
          <Grid container spacing={3}>
            {/* Personal Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card {...cardSx} sx={{ ...cardSx.sx, height: "100%" }}>
                <CardContent sx={{ p: "24px !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{
                        p: 0.75,
                        borderRadius: "8px",
                        bgcolor: "#EFF6FF",
                        display: "flex",
                      }}
                    >
                      <User size={18} color="#3B82F6" />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.975rem",
                        color: "#0F172A",
                      }}
                    >
                      Personal Information
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2, borderColor: "#F1F5F9" }} />
                  <Stack spacing={2}>
                    <InfoRow label="Full Name" value="Prosonjit Das" />
                    <InfoRow label="Email" value="prosonjit@gmail.com" />
                    <InfoRow label="Phone" value="+91 9876543210" />
                    <InfoRow label="Gender" value="Male" />
                    <InfoRow label="Date of Birth" value="01 Jan 2005" />
                    <InfoRow label="Address" value="West Bengal, India" />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Medical Info */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card {...cardSx} sx={{ ...cardSx.sx, height: "100%" }}>
                <CardContent sx={{ p: "24px !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 2 }}
                  >
                    <Box
                      sx={{
                        p: 0.75,
                        borderRadius: "8px",
                        bgcolor: "#ECFDF5",
                        display: "flex",
                      }}
                    >
                      <Hospital size={18} color="#10B981" />
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.975rem",
                        color: "#0F172A",
                      }}
                    >
                      Medical Information
                    </Typography>
                  </Stack>
                  <Divider sx={{ mb: 2, borderColor: "#F1F5F9" }} />
                  <Stack spacing={2}>
                    <InfoRow
                      label="Blood Group"
                      value="B+"
                      badge
                      badgeColor="#EF4444"
                      badgeBg="#FEF2F2"
                    />
                    <InfoRow label="Allergies" value="None" />
                    <InfoRow label="Medication" value="No Active Medication" />
                    <InfoRow label="Smoking Status" value="Non-Smoker" />
                    <InfoRow
                      label="Medical Conditions"
                      value="No Known Conditions"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Upcoming Appointments */}
            <Grid size={{ xs: 12 }}>
              <Card {...cardSx}>
                <CardContent sx={{ p: "24px !important" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        sx={{
                          p: 0.75,
                          borderRadius: "8px",
                          bgcolor: "#F5F3FF",
                          display: "flex",
                        }}
                      >
                        <CalendarDays size={18} color="#8B5CF6" />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.975rem",
                          color: "#0F172A",
                        }}
                      >
                        Upcoming Appointments
                      </Typography>
                    </Stack>
                    <Chip
                      label="2 scheduled"
                      size="small"
                      sx={{
                        bgcolor: "#F5F3FF",
                        color: "#8B5CF6",
                        fontWeight: 600,
                        fontSize: "12px",
                        border: "1px solid #EDE9FE",
                      }}
                    />
                  </Stack>
                  <Divider sx={{ mb: 2.5, borderColor: "#F1F5F9" }} />

                  <Stack spacing={2}>
                    {appointments.map((appt, i) => (
                      <Box
                        key={i}
                        sx={{
                          p: 2,
                          borderRadius: "12px",
                          border: "1px solid #F1F5F9",
                          bgcolor: "#FAFAFA",
                          transition: "all 0.15s ease",
                          "&:hover": {
                            bgcolor: "#F8FAFC",
                            borderColor: "#E2E8F0",
                          },
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          spacing={2}
                          alignItems={{ sm: "center" }}
                        >
                          <Avatar
                            sx={{
                              width: 44,
                              height: 44,
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              bgcolor: appt.bg,
                              color: appt.color,
                              border: `1px solid ${appt.color}30`,
                            }}
                          >
                            {appt.avatar}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                color: "#0F172A",
                              }}
                            >
                              {appt.doctor}
                            </Typography>
                            <Typography
                              sx={{ color: "#64748B", fontSize: "0.825rem" }}
                            >
                              {appt.service} · {appt.specialty}
                            </Typography>
                          </Box>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Clock size={14} color="#94A3B8" />
                            <Typography
                              sx={{ color: "#64748B", fontSize: "0.825rem" }}
                            >
                              {appt.date} · {appt.time}
                            </Typography>
                          </Stack>
                          <Chip
                            label="Confirmed"
                            size="small"
                            sx={{
                              bgcolor: "#ECFDF5",
                              color: "#059669",
                              fontWeight: 600,
                              fontSize: "12px",
                              border: "1px solid #D1FAE5",
                            }}
                          />
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Notification Preferences */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card {...cardSx}>
                <CardContent sx={{ p: "24px !important" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.975rem",
                      color: "#0F172A",
                      mb: 2,
                    }}
                  >
                    Notification Preferences
                  </Typography>
                  <Divider sx={{ mb: 2, borderColor: "#F1F5F9" }} />
                  <Stack spacing={1}>
                    {[
                      {
                        label: "Appointment Reminders",
                        sub: "Get notified 24h before",
                        checked: true,
                      },
                      {
                        label: "Email Notifications",
                        sub: "Updates via email",
                        checked: true,
                      },
                      {
                        label: "SMS Notifications",
                        sub: "Updates via SMS",
                        checked: false,
                      },
                    ].map((item) => (
                      <Box
                        key={item.label}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          py: 1.5,
                          px: 2,
                          borderRadius: "10px",
                          bgcolor: "#F8FAFC",
                          border: "1px solid #F1F5F9",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.875rem",
                              color: "#1E293B",
                            }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "0.775rem", color: "#94A3B8" }}
                          >
                            {item.sub}
                          </Typography>
                        </Box>
                        <Switch
                          defaultChecked={item.checked}
                          size="small"
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#3B82F6",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              { bgcolor: "#3B82F6" },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Account Settings */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card {...cardSx}>
                <CardContent sx={{ p: "24px !important" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.975rem",
                      color: "#0F172A",
                      mb: 2,
                    }}
                  >
                    Account Settings
                  </Typography>
                  <Divider sx={{ mb: 2, borderColor: "#F1F5F9" }} />
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      startIcon={<Lock size={16} />}
                      variant="outlined"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 500,
                        borderColor: "#E2E8F0",
                        color: "#475569",
                        justifyContent: "flex-start",
                        py: 1.25,
                        "&:hover": {
                          borderColor: "#CBD5E1",
                          bgcolor: "#F8FAFC",
                        },
                      }}
                    >
                      Change Password
                    </Button>
                    <Button
                      fullWidth
                      startIcon={<Trash2 size={16} />}
                      variant="outlined"
                      color="error"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 500,
                        borderColor: "#FEE2E2",
                        color: "#EF4444",
                        justifyContent: "flex-start",
                        py: 1.25,
                        "&:hover": {
                          borderColor: "#FCA5A5",
                          bgcolor: "#FFF5F5",
                        },
                      }}
                    >
                      Delete Account
                    </Button>
                    <Button
                      fullWidth
                      startIcon={<LogOut size={16} />}
                      variant="contained"
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#0F172A",
                        color: "#fff",
                        justifyContent: "flex-start",
                        py: 1.25,
                        "&:hover": { bgcolor: "#1E293B" },
                      }}
                    >
                      Logout
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

const InfoRow = ({
  label,
  value,
  badge,
  badgeColor,
  badgeBg,
}: {
  label: string;
  value: string;
  badge?: boolean;
  badgeColor?: string;
  badgeBg?: string;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{ color: "#94A3B8", fontSize: "0.825rem", fontWeight: 500 }}
    >
      {label}
    </Typography>
    {badge ? (
      <Chip
        label={value}
        size="small"
        sx={{
          bgcolor: badgeBg,
          color: badgeColor,
          fontWeight: 700,
          fontSize: "12px",
          border: `1px solid ${badgeColor}20`,
        }}
      />
    ) : (
      <Typography
        sx={{ fontWeight: 500, fontSize: "0.875rem", color: "#1E293B" }}
      >
        {value}
      </Typography>
    )}
  </Box>
);

export default Profile;
