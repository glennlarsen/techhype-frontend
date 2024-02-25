import * as Yup from "yup";
import { EMAIL_REGEX } from "constants/regex";

const registrationSchema = Yup.object().shape({
  name: Yup.string()
  .required("Full Name is required")
  .test("two-names", "Please enter both first and last names", (value) => {
    if (!value) return false;
    const names = value.split(" ");
    return names.length >= 2 && names.every(name => name.trim().length > 0);
  }),
  email: Yup.string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, "Enter a valid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export default registrationSchema;
