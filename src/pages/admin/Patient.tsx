import {
  Box,
  Button,
  CircularProgress,
  Container,
  // Dialog, DialogActions, DialogContent, DialogTitle,
  // FormControlLabel,
  IconButton,
  Table,
  // Switch,
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
import { fetchPatientList } from "../../store/slices/patient.slice";

const Patient = () => {
  const { isLoading, isError, patients } = useAppSelector(
    (state) => state.patient,
  );
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchPatientList())
  },[dispatch])


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
          // onClick={() => dispatch(setServiceDialogOpen())}
        >
          Add New Patient
        </Button>
      </Box>

      {/* dialog*/}
      {/* <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setServiceDialogClose())}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialog.selectedService ? "Edit Service" : "Add New Service"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {serviceInputField.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as Path<ServicePayload>}
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
            {dialog.selectedService ? "Update Image" : "Upload Image"}
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setValue("image", url);
                  // must have to create a fns to collect the img
                  dispatch(setServiceImagePreview(url));
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
          <Button onClick={() => dispatch(setServiceDialogClose())}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {dialog.selectedService ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog> */}

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
                    <TableCell align="center">Patient Image</TableCell>
                    <TableCell align="center">Patient Name</TableCell>
                    <TableCell align="center">Patient Email</TableCell>
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

                      <TableCell
                        align="center"
                        sx={{
                          pointerEvents: "visible",
                          // opacity: row.status ? 1 : 1,
                          color: "white",
                        }}
                      >
                        {/* <Tooltip title={row.status ? "Disable" : "Enable"}>
                          <FormControlLabel
                            label={row.status ? "Enable" : "Disable"}
                            control={
                              <Switch
                                checked={row.status}
                                onChange={() =>
                                  dispatch(
                                    changeStatus({
                                      id: row.$id,
                                      status: row.status,
                                    }),
                                  )
                                }
                              />
                            }
                          />
                        </Tooltip> */}
                        Status
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
                              // onClick={() =>
                              //   dispatch(setEditServiceDialogOpen(row))
                              // }
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
                              // onClick={() => dispatch(deleteService(row.$id))}
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
