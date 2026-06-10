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
import {
  addNewPatient,
  changePatientStatus,
  deletePatient,
  editPatient,
  fetchPatientList,
  setEditPatientDialogOpen,
  setPatientDialogClose,
  setPatientDialogOpen,
  setPatientImagePreview,
} from "../../store/slices/patient.slice";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Path } from "react-hook-form";
import DynamicInput from "../../components/DynamicInput";
import {
  patientAddInputField,
  patientEditInputField,
} from "../../services/json/patientManage.json";
import { toast } from "sonner";
import type { PatientPayload } from "../../type/interface/patient.interface";
import { patientSchema } from "../../services/validation/patientmanage.validation";

const Patient = () => {
  const { isLoading, isError, patients, dialog, imagePreview } = useAppSelector(
    (state) => state.patient,
  );
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientPayload>({
    resolver: yupResolver(patientSchema) as any,
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      image: null,
    },
  });

  useEffect(() => {
    dispatch(fetchPatientList());
  }, [dispatch]);

  useEffect(() => {
    if (dialog.selectedPatient) {
      reset({
        id: dialog.selectedPatient.$id,
        name: dialog.selectedPatient.name,
        phone: dialog.selectedPatient.phone,
        address: dialog.selectedPatient.address,
      });
      dispatch(setPatientImagePreview(dialog.selectedPatient.image));
    } else {
      reset({
        name: "",
        phone: "",
        address: "",
      });
    }
  }, [dialog.selectedPatient, dispatch, reset]);

  // * onsubmit
  const onSubmit = (data: PatientPayload) => {
    // console.log('data on submit ', data)
    if (dialog.selectedPatient) {
      // console.log('updating data')
      dispatch(
        editPatient({
          id: data.id,
          data: data,
        }),
      ).unwrap();
      dispatch(fetchPatientList());
      // dispatch(setPatientDialogClose());
      toast.success("Patient Details Edited Successfully");
    } else {
      dispatch(addNewPatient(data)).unwrap();
      dispatch(fetchPatientList());
      toast.success("New Patient Added Successfully");
    }
    dispatch(setPatientDialogClose());
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
          All Patients Lists
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(setPatientDialogOpen())}
        >
          Add New Patient
        </Button>
      </Box>

      {/* dialog*/}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setPatientDialogClose())}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialog.selectedPatient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {dialog.selectedPatient
            ? patientEditInputField.map((field) => (
                <DynamicInput
                  key={field.name}
                  name={field.name as Path<PatientPayload>}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  rows={field.rows}
                  required={field.required}
                  register={register}
                  errors={errors}
                />
              ))
            : patientAddInputField.map((field) => (
                <DynamicInput
                  key={field.name}
                  name={field.name as Path<PatientPayload>}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  rows={field.rows}
                  required={field.required}
                  register={register}
                  errors={errors}
                />
              ))}

          <Button variant="outlined" component="label">
            {dialog.selectedPatient ? "Update Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setValue("image", file);

                  const previewUrl = URL.createObjectURL(file);

                  dispatch(setPatientImagePreview(previewUrl));
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
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => dispatch(setPatientDialogClose())}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {dialog.selectedPatient ? "Update" : "Add"}
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
                    <TableCell align="left">Patient Image</TableCell>
                    <TableCell align="left">Patient Name</TableCell>
                    <TableCell align="center">Patient Email</TableCell>
                    <TableCell align="center">Password</TableCell>
                    <TableCell align="center">Patient PH. No</TableCell>
                    <TableCell align="center">Patient Address</TableCell>
                    <TableCell align="center">Patient Gender</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients?.map((row) => (
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
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.password}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center">{row.address}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>

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
                                    changePatientStatus({
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
                                dispatch(setEditPatientDialogOpen(row))
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
                              onClick={() => dispatch(deletePatient(row.$id))}
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

export default Patient;
