import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  username: Yup.string().email("Please enter valid email").required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("password required"),
});

