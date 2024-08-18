import { useState } from "react";
import * as Yup from "yup";

const useRegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noWhatsapp, setNoWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("2");
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    noWhatsapp: Yup.string()
      .matches(/^\d+$/, "WhatsApp number must be only digits")
      .required("WhatsApp number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const validate = async () => {
    try {
      await validationSchema.validate(
        { name, email, noWhatsapp, password },
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
    name,
    setName,
    email,
    setEmail,
    noWhatsapp,
    setNoWhatsapp,
    password,
    setPassword,
    role,
    setRole,
    errors,
    validate,
  };
};

export default useRegisterForm;
