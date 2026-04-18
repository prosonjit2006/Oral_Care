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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { planInputField } from "../../services/json/planmanage.input";
import { planSchema } from "../../services/validation/planmanage.validation";
import { plans } from "../../services/json/data.json";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

// input type
type PlanInputType = {
  name: string;
  price: number;
  description: string;
  features: string;
};

const PlanManage = () => {
  const [planList, setPlanList] = useState(
    plans.map((item) => ({
      ...item,
      enable: true,
    })),
  );
  const [editItem, setEditItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanInputType>({
    resolver: yupResolver(planSchema),
    defaultValues: {
      name: "",
      price: undefined,
      description: "",
      features: "",
    },
  });

  // default value reset
  const defaultValues = {
    name: "",
    price: undefined,
    description: "",
    features: "",
  };

  // handel open
  const handleOpen = () => {
    setOpen(true);
    setEditItem(null);
    reset(defaultValues);
  };
  // handel close
  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
    reset(defaultValues);
    setIsLoading(false);
  };

  // handel edit
  const handleEdit = (item: any) => {
    setEditItem(item);
    reset({
      name: item.title,
      price: item.price,
      description: item.description,
      features: item.features.map((f: any) => f.label).join(", "),
    });
    setOpen(true);
  };

  // handel delete
  const handleDelete = (id: string | number) => {
    setPlanList((prev) => prev.filter((item) => item.id !== id));

    toast.success("Plan deleted successfully");
  };

  // handel edit
  const onSubmit = (data: PlanInputType) => {
    if (editItem) {
      // update
      setPlanList((prev) =>
        prev.map((item) =>
          item.id === editItem.id
            ? {
                ...item,
                title: data.name,
                price: data.price,
                description: data.description,
                features: data.features.split(",").map((f, index) => ({
                  id: String(index),
                  label: f.trim(),
                })),
              }
            : item,
        ),
      );
    }
    // add
    else {
      const newItem = {
        id: crypto.randomUUID(),
        title: data.name,
        price: data.price,
        description: data.description,
        features: data.features.split(",").map((f, index) => ({
          id: String(index),
          label: f.trim(),
        })),
        enable: true,
      };

      setPlanList((prev) => [...prev, newItem]);
    }

    toast.success(
      editItem ? "Plan updated successfully" : "New plan added successfully",
    );

    setIsLoading(true);
    handleClose();
    setEditItem(null);
    reset();
  };

  const handelToggle = (id: string) => {
    setPlanList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enable: !item.enable } : item,
      ),
    );
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

        <Button variant="contained" onClick={handleOpen}>
          Add New Plans
        </Button>
      </Box>

      {/* dialog*/}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={open}
        // onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          {editItem ? "Edit Service" : "Add New Service"}
        </DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {planInputField.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editItem ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* plan ui render */}
      {isLoading ? (
        <CircularProgress size={25} />
      ) : (
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
              {planList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    pointerEvents: row.enable ? "auto" : "none",
                    opacity: row.enable ? 1 : 0.5,
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">${row.price}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">
                    {row.features.map((item) => (
                      <Box key={item.id}>{item.label}</Box>
                    ))}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      pointerEvents: "visible",
                      opacity: row.enable ? 1 : 1,
                      color: "white",
                    }}
                  >
                    <Tooltip title={row.enable ? "Disable" : "Enable"}>
                      <FormControlLabel
                        label={row.enable ? "Enable" : "Disable"}
                        control={
                          <Switch
                            checked={row.enable}
                            onChange={() => handelToggle(row.id)}
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
                        pointerEvents: row.enable ? "auto" : "none",
                        opacity: row.enable ? 1 : 0.5,
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEdit(row)}
                          sx={{
                            bgcolor: "#bbdefb",
                            "&:hover": { bgcolor: "#e3f2fd" },
                          }}
                        >
                          <Pencil size={16} className="text-blue-700" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(row.id)}
                          sx={{
                            bgcolor: "#ffcdd2",
                            "&:hover": { bgcolor: "#ffebee" },
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
    </Container>
  );
};

export default PlanManage;
