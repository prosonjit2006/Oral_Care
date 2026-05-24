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
import DynamicInput from "../../components/DynamicInput";
import { useForm, type Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { planInputField } from "../../services/json/planmanage.input";
import { planSchema } from "../../services/validation/planmanage.validation";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import {
  addNewPlan,
  changeplanStatus,
  deletePlan,
  editPlan,
  fetchPlanList,
  setEditPlanDialogOpen,
  setPlanDialogClose,
  setPlanDialogOpen,
} from "../../store/slices/plan.slice";
import type { PlanPayload } from "../../type/interface/plan.interface";
import { useEffect } from "react";
import { toast } from "sonner";

const PlanManage = () => {
  const { isLoading, isError, plans, dialog } = useAppSelector(
    (state) => state.plan,
  );

  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanPayload>({
    resolver: yupResolver(planSchema),
    defaultValues: {
      planname: "",
      price: undefined,
      description: "",
      feature: "",
    },
  });

  useEffect(() => {
    dispatch(fetchPlanList());
  }, [dispatch]);

  useEffect(() => {
    if (dialog.selectedPlan) {
      reset({
        planname: dialog.selectedPlan.planname,
        description: dialog.selectedPlan.description,
        price: dialog.selectedPlan.price,
        feature: dialog.selectedPlan.feature,
      });
    } else {
      reset({
        planname: "",
        price: "" as unknown as number,
        description: "",
        feature: "",
      });
    }
  }, [dialog.selectedPlan, reset]);

  // console.log("selected data", dialog.selectedPlan);

  const onSubmit = async (data: PlanPayload) => {
    if (dialog.selectedPlan) {
      try {
        await dispatch(
          editPlan({ id: dialog.selectedPlan.$id, data: data }),
        ).unwrap();
        toast.success("Plan updated successfully");
        // dispatch(setPlanDialogClose());
        // reset();
      } catch (error) {
        toast.error("Failed update plan");
        console.error(error);
      }
    } else {
      try {
        await dispatch(addNewPlan(data)).unwrap();
        toast.success("Plan added successfully");
        // dispatch(setPlanDialogClose());
        // reset();
      } catch (error) {
        toast.error("Failed to add plan");
        console.error(error);
      }
    }
    dispatch(setPlanDialogClose());
    reset();
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 2 }}>
      {/* hearder part */}
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
          All Plan Lists
        </Typography>

        <Button
          variant="contained"
          onClick={() => dispatch(setPlanDialogOpen())}
        >
          Add New Plans
        </Button>
      </Box>

      {/* dialog*/}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setPlanDialogClose())}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {dialog.selectedPlan ? "Edit Service" : "Add New Service"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {planInputField.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as Path<PlanPayload>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              rows={field.rows}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => dispatch(setPlanDialogClose())}
            variant="contained"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {dialog.selectedPlan ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* plan ui render */}
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
        <>
          {/* is error part  */}
          {isError ? (
            <Typography>{isError}</Typography>
          ) : (
            // actual ui table
            <TableContainer>
              <Table
                sx={{ minWidth: 650, color: "#fff" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Plan Duration</TableCell>
                    <TableCell align="center">Prices</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Features</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plans.map((row) => (
                    <TableRow
                      key={row.$id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        // pointerEvents: row.status ? "auto" : "none",
                        opacity: row.status ? 1 : 0.5,
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.planname}
                      </TableCell>
                      <TableCell align="center">${row.price}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {/* {row.feature.map((item) => (
                          <Box key={item.id}>{item.label}</Box>
                        ))} */}
                        {row.feature}
                      </TableCell>
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
                                    changeplanStatus({
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
                                dispatch(setEditPlanDialogOpen(row))
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
                              onClick={() => dispatch(deletePlan(row.$id))}
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

export default PlanManage;
