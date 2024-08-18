import { useState } from "react";
import * as Yup from "yup";

const useLoginForm = () => {
  const [emailOrWhatsapp, setEmailOrWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    emailOrWhatsapp: Yup.string()
      .test(
        "email-or-phone",
        "Enter a valid email or WhatsApp number",
        (value) => {
          return (
            Yup.string().email().isValidSync(value) ||
            Yup.string()
              .matches(/^\d+$/, "Must be only digits")
              .isValidSync(value)
          );
        }
      )
      .required("Email or WhatsApp number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(
        { emailOrWhatsapp, password },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  return {
    emailOrWhatsapp,
    setEmailOrWhatsapp,
    password,
    setPassword,
    errors,
    validate,
  };
};

export default useLoginForm;
