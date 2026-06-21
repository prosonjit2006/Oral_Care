// bookingForm.input.ts
export const bookingFormInput = [
  {
    name: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    required: true,
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Any notes for the doctor (optional)",
    type: "textarea",
    required: false,
    rows: 4,
  },
];
