import type { SxProps, Theme } from "@mui/material";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export type FieldType = "text" | "email" | "password" | "textarea";

export type DynamicInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: FieldType | string;
  rows?: number;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  sx?: SxProps<Theme>;
};
