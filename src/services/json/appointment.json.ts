export const dummySchedule: Record<string, Record<string, string[]>> = {
  "Jack Jones": {
    "2026-06-15": ["09:00 AM", "10:00 AM", "11:00 AM"],
    "2026-06-16": ["02:00 PM", "03:00 PM"],
    "2026-06-18": ["09:00 AM", "04:00 PM"],
  },
  "William Jones": {
    "2026-06-17": ["10:00 AM", "11:00 AM"],
    "2026-06-18": ["01:00 PM", "02:00 PM", "03:00 PM"],
  },
  "Cameron Wills": {
    "2026-06-15": ["09:00 AM", "10:00 AM"],
    "2026-06-19": ["01:00 PM", "02:00 PM"],
  },
  "Anatoli Black": {
    "2026-06-20": ["09:00 AM", "10:00 AM", "11:00 AM"],
  },
  "Merry Jones": {
    "2026-06-16": ["09:00 AM", "10:00 AM"],
    "2026-06-17": ["03:00 PM", "04:00 PM"],
  },
};

// * Fallback schedule used for any doctor not present in dummySchedule above
export const fallbackSchedule: Record<string, string[]> = {
  "2026-06-15": ["09:00 AM", "10:00 AM", "11:00 AM"],
  "2026-06-16": ["02:00 PM", "03:00 PM"],
  "2026-06-18": ["09:00 AM", "04:00 PM"],
};

export const getDoctorSchedule = (
  doctorName?: string,
): Record<string, string[]> => {
  if (!doctorName) return {};
  return dummySchedule[doctorName] || fallbackSchedule;
};

// ! all the appoinments input fields

export const appointmentAddInputField = [
  {
    name: "message",
    label: "Message",
    placeholder: "Add any additional message or notes",
    type: "text",
    required: false,
    rows: 3,
  },
];

export const appointmentEditInputField = [
  {
    name: "serviceTitle",
    label: "Service Title",
    placeholder: "Enter service title",
    type: "text",
    required: true,
    rows: 1,
  },
  {
    name: "appointmentDate",
    label: "Appointment Date",
    placeholder: "Select appointment date",
    type: "date",
    required: true,
    rows: 1,
  },
  {
    name: "appointmentTime",
    label: "Appointment Time",
    placeholder: "Select appointment time",
    type: "time",
    required: true,
    rows: 1,
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Update message or notes",
    type: "text",
    required: false,
    rows: 3,
  },
];
