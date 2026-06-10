import ProfileHero from "../../Section/Profile/ProfileHero";
import ProfileInfo from "../../Section/Profile/ProfileInfo";
import ProfileAppointments from "../../Section/Profile/ProfileAppointments";
import ProfileNotifications from "../../Section/Profile/ProfileNotifications";
import ProfileSettings from "../../Section/Profile/ProfileSettings";
import ProfileOverview from "../../Section/Profile/ProfileOverview";
import {
  appointments,
  medicalInfo,
  notifications,
  profileEditInput,
  // personalInfo,
  quickActions,
  stats,
} from "../../services/json/profile.json";
import { useAppDispatch, useAppSelector } from "../../hooks/useredux";
import { LogOutUser } from "../../store/slices/auth.slice";
import { useEffect } from "react";
import {
  fetchPaitentData,
  setProfileDialogClose,
  updatePatientProfile,
} from "../../store/slices/profile.slice";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DynamicInput from "../../components/DynamicInput";
import { Controller, useForm, type Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { EditProfilePayload } from "../../type/interface/profile.interface";
import { editProfileSchema } from "../../services/validation/profile.validation";

const userCookie = Cookies.get("user");

const user = userCookie ? JSON.parse(userCookie) : null;
// console.log("rowID", user);

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    // isError,
    patientData,
    dialog,
  } = useAppSelector((state) => state.profile);

  // console.log("err in the profile page", isError);

  const patient = patientData;
  // console.log('data', patientData)

  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    control,
    formState: { errors },
  } = useForm<EditProfilePayload>({
    resolver: yupResolver(editProfileSchema) as any,
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
    },
  });

  useEffect(() => {
    dispatch(fetchPaitentData(user?.email));
  }, [dispatch]);

  // useEffect(() => {
  //   if (dialog.selectedProfile) {
  //     reset({
  //       name: patient?.name,
  //       phone: patient?.phone,
  //       address: patient?.address,
  //       dob: patient?.dob,
  //       gender: patient?.gender,
  //     });
  //   } else {
  //     reset({ name: "", phone: "", gender: "", dob: "", address: "" });
  //   }
  // }, [dialog.selectedProfile, patient, reset]);

  useEffect(() => {
    if (dialog.open && patient) {
      reset({
        name: patient.name ?? "",
        phone: patient.phone ?? "",
        address: patient.address ?? "",
        dob: patient.dob ?? "",
        gender: patient.gender ?? "",
      });
    }
  }, [dialog.open, patient, reset]);

  const onSubmit = (data: EditProfilePayload) => {
    dispatch(
      updatePatientProfile({
        email: user.email,
        data,
      }),
    );
    dispatch(setProfileDialogClose())
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      {/* dialog part */}
      <Dialog
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        open={dialog.open}
        onClose={() => dispatch(setProfileDialogClose())}
        fullWidth
        maxWidth="xs"
        sx={{ p: 0, margin: 0 }}
      >
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          {profileEditInput.map((field) => (
            <DynamicInput
              key={field.name}
              name={field.name as Path<EditProfilePayload>}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              rows={1} // ! static value is given here
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}

          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth error={!!error}>
                <InputLabel id="gender-label">Gender</InputLabel>

                <Select
                  {...field}
                  labelId="gender-label"
                  id="gender"
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>

                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>

                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: 2,
            mb: 1,
          }}
        >
          <Button
            onClick={() => dispatch(setProfileDialogClose())}
            variant="contained"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* {isError && } */}
      {isLoading === true ? (
        <div className="flex justify-center items-center h-[90vh]">
          <Loader2 size={60} className="animate-spin" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-4">
          <ProfileHero
            name={patient?.name ?? "N/A"}
            email={patient?.email ?? "N/A"}
            phone={patient?.phone ?? "N/A"}
            status={patient?.status ?? false}
          />

          <ProfileOverview stats={stats} actions={quickActions} />

          {patient && (
            <ProfileInfo
              personalInfo={patient}
              medicalInfo={medicalInfo}
              bloodGroup="A+"
            />
          )}

          <ProfileAppointments appointments={appointments} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileNotifications notifications={notifications} />
            <ProfileSettings
              onChangePassword={() => console.log("change password")}
              onForgotPassword={() => console.log("forgot password")}
              onDeleteAccount={() => console.log("delete account")}
              onLogout={() => dispatch(LogOutUser())}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
