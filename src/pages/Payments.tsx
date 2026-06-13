import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircle, CreditCard, Lock, Shield } from "lucide-react";

const selectedPlan = {
  title: "Quarterly Plan",
  duration: "3 Months",
  price: 99,
  features: [
    "Free Check-up Every 3 Months",
    "20% Off On Medicines",
    "10% Off On Treatments",
    "Priority Appointment Booking",
  ],
};

const Payments = () => {
  return (
    <Box
      sx={{
        py: 8,
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip label="Secure Checkout" color="primary" sx={{ mb: 2 }} />

          <Typography variant="h4">Complete Your Membership</Typography>

          <Typography color="text.secondary">
            Review your plan details and proceed with payment.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Order Summary */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6">Order Summary</Typography>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Selected Plan
                    </Typography>

                    <Typography variant="h5">{selectedPlan.title}</Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>

                    <Typography>{selectedPlan.duration}</Typography>
                  </Box>

                  <Divider />

                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Benefits Included
                    </Typography>

                    <Stack spacing={1}>
                      {selectedPlan.features.map((feature) => (
                        <Box
                          key={feature}
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CheckCircle className="" />

                          <Typography variant="body2">{feature}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">Total</Typography>

                    <Typography variant="h4">${selectedPlan.price}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Section */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid #e5e7eb",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <CreditCard />

                  <Typography variant="h6">Payment Information</Typography>
                </Box>

                {/* Stripe Placeholder */}

                <Box
                  sx={{
                    border: "2px dashed #cbd5e1",
                    borderRadius: 3,
                    p: 5,
                    textAlign: "center",
                    bgcolor: "#fafafa",
                  }}
                >
                  <CreditCard className=" text-2xl text-[#94a3b8] mb: 2" />

                  <Typography variant="h6">Stripe Payment Element</Typography>

                  <Typography color="text.secondary">
                    Replace this section with Stripe Elements after integration.
                  </Typography>
                </Box>

                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                    },
                    mt: 4,
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Shield />

                    <Typography variant="body2">SSL Secured</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Lock />

                    <Typography variant="body2">Stripe Protected</Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  sx={{
                    mt: 4,
                    py: 1.6,
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  Pay ${selectedPlan.price}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Payments;
