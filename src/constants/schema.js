import * as yup from "yup";
import {EMAIL_REGEX} from "constants/regex";

const schema = yup.object().shape({
    email: yup
      .string()
      .matches(EMAIL_REGEX, "Enter a valid email"),
  });
  
  export default schema;