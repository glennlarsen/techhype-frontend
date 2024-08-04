import * as Yup from "yup";
import { EMAIL_REGEX } from "constants/regex";

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/\W/, "Password must contain at least one special character")
    .required("New Password is required"),
});

export default resetPasswordSchema;
