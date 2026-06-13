// ! all the static json data 

export const services = [
  {
    id: 1,
    title: "Cardiology",
  },
  {
    id: 2,
    title: "Neurology",
  },
  {
    id: 3,
    title: "Orthopedics",
  },
  {
    id: 4,
    title: "Pediatrics",
  },
];

export const doctors = [
  {
    id: "1",
    name: "Dr. John Smith",
    service: "Cardiology",

    schedule: {
      "2026-06-15": ["09:00 AM", "10:00 AM", "11:00 AM"],

      "2026-06-16": ["02:00 PM", "03:00 PM"],

      "2026-06-18": ["09:00 AM", "04:00 PM"],
    },
  },

  {
    id: "2",
    name: "Dr. Sarah Wilson",
    service: "Cardiology",

    schedule: {
      "2026-06-17": ["10:00 AM", "11:00 AM"],

      "2026-06-18": ["01:00 PM", "02:00 PM", "03:00 PM"],
    },
  },

  {
    id: "3",
    name: "Dr. Michael Brown",
    service: "Neurology",

    schedule: {
      "2026-06-15": ["09:00 AM", "10:00 AM"],

      "2026-06-19": ["01:00 PM", "02:00 PM"],
    },
  },

  {
    id: "4",
    name: "Dr. David Miller",
    service: "Orthopedics",

    schedule: {
      "2026-06-20": ["09:00 AM", "10:00 AM", "11:00 AM"],
    },
  },

  {
    id: "5",
    name: "Dr. Emily Davis",
    service: "Pediatrics",

    schedule: {
      "2026-06-16": ["09:00 AM", "10:00 AM"],

      "2026-06-17": ["03:00 PM", "04:00 PM"],
    },
  },
];




// ! all the appoinments input fields

export const appointmentAddInputField = [
//   {
//     name: "serviceTitle",
//     label: "Service Title",
//     placeholder: "Enter service title",
//     type: "text",
//     required: true,
//     rows: 1,
//   },
//   {
//     name: "doctorId",
//     label: "Doctor ID",
//     placeholder: "Enter doctor ID",
//     type: "text",
//     required: true,
//     rows: 1,
//   },
//   {
//     name: "doctorName",
//     label: "Doctor Name",
//     placeholder: "Enter doctor name",
//     type: "text",
//     required: true,
//     rows: 1,
//   },
//   {
//     name: "appointmentDate",
//     label: "Appointment Date",
//     placeholder: "Select appointment date",
//     type: "date",
//     required: true,
//     rows: 1,
//   },
//   {
//     name: "appointmentTime",
//     label: "Appointment Time",
//     placeholder: "Select appointment time",
//     type: "time",
//     required: true,
//     rows: 1,
//   },
  {
    name: "patientName",
    label: "Patient Name",
    placeholder: "Enter patient name",
    type: "text",
    required: true,
    rows: 1,
  },
  {
    name: "patientEmail",
    label: "Patient Email",
    placeholder: "Enter patient email",
    type: "email",
    required: true,
    rows: 1,
  },
  {
    name: "patientPhone",
    label: "Patient Phone",
    placeholder: "Enter patient phone number",
    type: "number",
    required: true,
    rows: 1,
  },
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
