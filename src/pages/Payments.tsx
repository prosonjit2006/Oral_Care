import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Fab,
} from "@mui/material";
import { ArrowLeft, CheckCircle, CreditCard, Lock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useredux";
import { useEffect } from "react";
import { setCheckoutPlan } from "../store/slices/plan.slice";

const Payments = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { plans, checkOutSelectedPlan } = useAppSelector((state) => state.plan);

  useEffect(() => {
    if (!checkOutSelectedPlan) {
      navigate("/payment");
    }
  }, [checkOutSelectedPlan, navigate]);

  const handlePlanChange = (planId: string) => {
    const selectedPlan = plans.find((item) => item.$id === planId);

    if (selectedPlan) {
      dispatch(setCheckoutPlan(selectedPlan));
    }
  };

  const handleCheckout = async () => {
    if (!checkOutSelectedPlan) return;

    // stripe checkout logic here

    console.log("checkout", checkOutSelectedPlan);

    /*
     onClick={async (e) => {
                    e.stopPropagation();
                    setSelectedPlan(itm.$id);
                    setLoadingPlan(itm.$id);
                    try {
                      // if(!isAuth) return
                    //  await checkout(itm.$id, itm.planname, itm.price);
                    navigate('/payment')
                    } catch (error) {
                      console.error("Checkout failed:", error);
                    } finally {
                      setLoadingPlan(null);
                    }
                  }}
    */
  };

  if (!checkOutSelectedPlan) return; // ! not null just return

  return (
    <Box
      sx={{
        py: 8,
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
      }}
    >
      <Container maxWidth="lg">
        {/* floating button - animate  */}
        <Fab
          color="primary"
          onClick={() => navigate(-1)}
          sx={{
            position: "fixed",
            top: 24,
            left: 24,
            zIndex: 1000,
          }}
        >
          <ArrowLeft />
        </Fab>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Chip label="Secure Checkout" color="primary" sx={{ mb: 2 }} />

          <Typography variant="h4">Complete Your Membership</Typography>

          <Typography color="text.secondary">
            Review your plan details and proceed with payment.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* LEFT SIDE */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              {/* Plan Selection */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Change Membership Plan
                  </Typography>

                  <FormControl fullWidth>
                    <InputLabel>Select Plan</InputLabel>

                    <Select
                      value={checkOutSelectedPlan.$id}
                      label="Select Plan"
                      onChange={(e) => handlePlanChange(e.target.value)}
                    >
                      {plans.map((plan) => (
                        <MenuItem key={plan.$id} value={plan.$id}>
                          {plan.planname} • ₹{plan.price}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #e5e7eb",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6">Order Summary</Typography>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Selected Plan
                      </Typography>

                      <Typography variant="h5">
                        {checkOutSelectedPlan.planname}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Duration
                      </Typography>

                      <Typography>{checkOutSelectedPlan.planname}</Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Benefits Included
                      </Typography>

                      <Stack spacing={1.5}>
                        {checkOutSelectedPlan.feature
                          .split(",")
                          .map((feature) => (
                            <Box
                              key={feature}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <CheckCircle size={18} />

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

                      <Typography variant="h4" color="primary">
                        ₹{checkOutSelectedPlan.price}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* RIGHT SIDE */}
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
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                  }}
                >
                  <CreditCard />

                  <Typography variant="h6">Payment Information</Typography>
                </Box>

                <Box
                  sx={{
                    border: "2px dashed #cbd5e1",
                    borderRadius: 3,
                    p: 5,
                    textAlign: "center",
                    bgcolor: "#fafafa",
                  }}
                >
                  <CreditCard size={48} />

                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Stripe Checkout
                  </Typography>

                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    You will be redirected securely to Stripe to complete your
                    payment.
                  </Typography>
                </Box>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={3}
                  sx={{ mt: 4 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Shield size={18} />
                    <Typography variant="body2">SSL Secured</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Lock size={18} />
                    <Typography variant="body2">Stripe Protected</Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={handleCheckout}
                  sx={{
                    mt: 4,
                    py: 1.8,
                    borderRadius: 3,
                    fontWeight: 700,
                  }}
                >
                  Pay ${checkOutSelectedPlan.price}
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
