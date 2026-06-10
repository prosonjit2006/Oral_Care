import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
// import DynamicInput from "../../components/DynamicInput";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Path } from "react-hook-form";
import DynamicInput from "../../components/DynamicInput";
import { toast } from "sonner";
import type { DoctorPayload } from "../../type/interface/doctor.interface";
import { doctorSchema } from "../../services/validation/doctor.validation";
import {
  addNewDoctor,
  changeDoctorStatus,
  deleteDoctor,
  editDoctor,
  fetchDoctorList,
  setDoctorDialogClose,
  setDoctorDialogOpen,
  setEditDoctorDialogOpen,
} from "../../store/slices/doctor.slice";
import { doctorInputField } from "../../services/json/doctor.json";

const Doctor = () => {
  const { isLoading, isError, doctors, dialog } = useAppSelector(
    (state) => state.doctor,
  );
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorPayload>({
    resolver: yupResolver(doctorSchema) as any,
    defaultValues: {
      name: "",
      specialization: "",
      rating: "",
      review: "",
    },
  });

  useEffect(() => {
    dispatch(fetchDoctorList());
  }, [dispatch]);

  useEffect(() => {
    if (dialog.selectedDoctor) {
      reset({
        name: dialog.selectedDoctor.name,
        specialization: dialog.selectedDoctor.specialization,
        rating: dialog.selectedDoctor.rating,
        review: dialog.selectedDoctor.review,
      });
    } else {
      reset({
        name: "",
        specialization: "",
        rating: "",
        review: "",
      });
    }
  }, [dialog.selectedDoctor, dispatch, reset]);

  // * onsubmit
  const onSubmit = (data: DoctorPayload) => {
    // console.log('data on submit ', data)
    if (dialog.selectedDoctor) {
      // console.log('updating data')
      dispatch(
        editDoctor({
          id: data.id,
          data: data,
        }),
      ).unwrap();
      dispatch(fetchDoctorList());
      // dispatch(setDoctorDialogClose());
      toast.success("Doctor Details Edited Successfully");
    } else {
      dispatch(addNewDoctor(data)).unwrap();
      dispatch(fetchDoctorList());
      toast.success("New Doctor Added Successfully");
    }
    dispatch(setDoctorDialogClose());
    reset();
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          All Doctors Lists
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(setDoctorDialogOpen())}
        >
          Add New Doctor
        </Button>
      </Box>

      {/* dialog*/}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setDoctorDialogClose())}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialog.selectedDoctor ? "Edit Doctor" : "Add New Doctor"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {doctorInputField.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as Path<DoctorPayload>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              rows={field.rows}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}

          {/* <Button variant="outlined" component="label">
            {dialog.selectedDoctor ? "Update Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setValue("image", file);

                  const previewUrl = URL.createObjectURL(file);

                  dispatch(setDoctorImagePreview(previewUrl));
                }
              }}
            />
          </Button>

          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              sx={{
                width: 200,
                height: 200,
                objectFit: "cover",
                mx: "auto",
                borderRadius: 2,
              }}
            />
          )} */}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => dispatch(setDoctorDialogClose())}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {dialog.selectedDoctor ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* table ui part */}
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <>
          {/* is error part  */}
          {isError ? (
            <Typography>{isError}</Typography>
          ) : (
            // actual table part
            <TableContainer>
              <Table
                sx={{ minWidth: 650, color: "#fff" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Doctor Image</TableCell>
                    <TableCell align="left">Doctor Name</TableCell>
                    <TableCell align="center">Doctor Specialization</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Review</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctors?.map((row) => (
                    <TableRow
                      key={row.$id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        // pointerEvents: row.status ? "auto" : "none",
                        // opacity: row.status ? 1 : 0.5,
                      }}
                    >
                      <TableCell align="center">
                        <Box
                          component="img"
                          src={row.image}
                          alt="img"
                          sx={{
                            width: "150px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.specialization}</TableCell>
                      <TableCell align="center">{row.rating}</TableCell>
                      <TableCell align="center">{row.review}</TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          pointerEvents: "visible",
                          opacity: row.status ? 1 : 1,
                          color: "white",
                        }}
                      >
                        <Tooltip title={row.status ? "Disable" : "Enable"}>
                          <FormControlLabel
                            label={row.status ? "Enable" : "Disable"}
                            control={
                              <Switch
                                checked={row.status}
                                onChange={() =>
                                  dispatch(
                                    changeDoctorStatus({
                                      id: row.$id,
                                      status: row.status,
                                    }),
                                  )
                                }
                              />
                            }
                          />
                        </Tooltip>
                      </TableCell>

                      <TableCell align="center" sx={{ marginLeft: "10px " }}>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                          }}
                        >
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() =>
                                dispatch(setEditDoctorDialogOpen(row))
                              }
                              sx={{
                                bgcolor: "#bbdefb",
                                "&:hover": { bgcolor: "#e3f2fd" },
                                pointerEvents: "visible",
                                opacity: 1,
                              }}
                            >
                              <Pencil size={16} className="text-blue-700" />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => dispatch(deleteDoctor(row.$id))}
                              sx={{
                                bgcolor: "#ffcdd2",
                                "&:hover": { bgcolor: "#ffebee" },
                                pointerEvents: "visible",
                                opacity: 1,
                              }}
                            >
                              <Trash2 size={16} className="text-red-700" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Container>
  );
};

export default Doctor;
