import { TextField } from "@mui/material";
import type { DynamicInputProps } from "../type/type/component.type";
import type { FieldValues } from "react-hook-form";

const DynamicInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  rows,
  required = false,
  register,
  errors,
}: DynamicInputProps<T>) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <TextField
      sx={{ mt: 1 }}
      label={
        required ? (
          <>
            {label} <span style={{ color: "red" }}>*</span>
          </>
        ) : (
          label
        )
      }
      placeholder={placeholder}
      type={type === "textarea" ? "text" : type}
      multiline={type === "textarea"}
      rows={type === "textarea" ? (rows ?? 3) : undefined}
      {...register(name)}
      error={!!errorMessage}
      helperText={errorMessage}
      fullWidth
    />
  );
};

export default DynamicInput;
