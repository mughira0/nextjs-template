// import { CURRENCY } from "@/constants/data";
// import { toast } from "sonner";

// export const createHeaders = (accessToken, isFormData = false) => {
//   const headers = {
//     "ngrok-skip-browser-warning": "true",
//   };
//   if (!isFormData) headers["Content-Type"] = "application/json";
//   if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
//   return headers;
// };
// export const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };
// export const handleYearsOptions = () => {
//   let years = [];
//   let currentYear = new Date().getFullYear();
//   console.log(currentYear);
//   for (let i = 0; i < 5; i++) {
//     years.push({ label: currentYear - i, value: currentYear - i });
//   }
//   return years;
// };
// export const convertCamelCase = (str) => str.replace(/([A-Z])/g, " $1").trim();
// export const validteParams = (body, skip = []) => {
//   for (const key in body) {
//     if (skip.includes(key)) continue;

//     if (!body[key]) {
//       toast.error(`${convertCamelCase(key)} is required`);
//       return false;
//     }
//     if (key == "email") {
//       const isValid = validateEmail(body[key]);
//       if (!isValid) {
//         toast.error(`${convertCamelCase(key)} is not valid`);
//         return false;
//       }
//     }
//     if (key == "password") {
//       if (body[key].length < 6) {
//         toast.error(`${convertCamelCase(key)} must be at least 6 characters`);

//         return false;
//       }
//     }
//   }
//   return true;
// };
// export const formatNumber = (num) => {
//   // add commas
//   const formatted = String(num)
//     .toString()
//     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return `${CURRENCY}${formatted}`;
// };

export const cn = (...classes: (string | boolean | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
