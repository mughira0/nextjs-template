export const cn = (...classes: (string | boolean | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const createHeaders = (
  accessToken: string | null | undefined,
  isFormData: boolean = false
): Record<string, string> => {
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Add Authorization header only if token exists
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
};
