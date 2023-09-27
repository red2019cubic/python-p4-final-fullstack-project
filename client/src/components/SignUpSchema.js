import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  username: Yup.string().email("Please enter valid email").min(5, "Too Short!").max(50, "Too Long!").required(),
  admin: Yup.string().max(1, "Must be a number 1 or 0").required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required(),
});
