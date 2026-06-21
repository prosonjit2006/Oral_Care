import {
  Box,
  CircularProgress,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import DynamicInput from "../../components/DynamicInput";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import { useEffect } from "react";
import { fetchPaymentsRecordList } from "../../store/slices/payments.slice";

const PaymentsHistory = () => {
  const { isLoading, isError, Payments } = useAppSelector(
    (state) => state.payments,
  );
  const dispatch = useAppDispatch();

  //   const {
  //     register,
  //     reset,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<DoctorPayload>({
  //     resolver: yupResolver(doctorSchema) as any,
  //     defaultValues: {
  //       name: "",
  //       specialization: "",
  //       rating: "",
  //       review: "",
  //     },
  //   });

  useEffect(() => {
    dispatch(fetchPaymentsRecordList());
  }, [dispatch]);

  //   useEffect(() => {
  //     if (dialog.selectedDoctor) {
  //       reset({
  //         name: dialog.selectedDoctor.name,
  //         specialization: dialog.selectedDoctor.specialization,
  //         rating: dialog.selectedDoctor.rating,
  //         review: dialog.selectedDoctor.review,
  //       });
  //     } else {
  //       reset({
  //         name: "",
  //         specialization: "",
  //         rating: "",
  //         review: "",
  //       });
  //     }
  //   }, [dialog.selectedDoctor, dispatch, reset]);

  // * onsubmit
  //   const onSubmit = (data: DoctorPayload) => {
  //     // console.log('data on submit ', data)
  //     if (dialog.selectedDoctor) {
  //       // console.log('updating data')
  //       dispatch(
  //         editDoctor({
  //           id: data.id,
  //           data: data,
  //         }),
  //       ).unwrap();
  //       dispatch(fetchDoctorList());
  //       // dispatch(setDoctorDialogClose());
  //       toast.success("Doctor Details Edited Successfully");
  //     } else {
  //       dispatch(addNewDoctor(data)).unwrap();
  //       dispatch(fetchDoctorList());
  //       toast.success("New Doctor Added Successfully");
  //     }
  //     dispatch(setDoctorDialogClose());
  //     reset();
  //   };

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        px: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        },
        py: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.6rem",
            },
            fontWeight: 600,
          }}
        >
          All Payments Lists
        </Typography>
      </Box>

      {/* Table */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 4,
          }}
        >
          <CircularProgress size={30} />
        </Box>
      ) : isError ? (
        <Typography color="error">{isError}</Typography>
      ) : (
        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Table
            aria-label="payments table"
            sx={{
              minWidth: {
                xs: 800,
                sm: 850,
                md: 900,
                lg: 1000,
                xl: 1100,
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Patient Name
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Patient Email
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Plan Selected
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Amount
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Card Type
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.85rem",
                      md: "0.95rem",
                    },
                    fontWeight: 700,
                  }}
                >
                  Payment Status
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Payments?.map((row) => (
                <TableRow
                  key={row.$id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                    }}
                  >
                    {row.patient_name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                    }}
                  >
                    {row.patient_email}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                    }}
                  >
                    {row.item_name}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                    }}
                  >
                    {row.amount}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                      textTransform: "capitalize",
                    }}
                  >
                    {row.card_brand}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: {
                        xs: "0.75rem",
                        sm: "0.85rem",
                        md: "0.95rem",
                      },
                      color:
                        row.payment_status === "paid" ? "#4caf50" : "#f44336",
                      fontWeight: 600,
                    }}
                  >
                    {row.payment_status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PaymentsHistory;
