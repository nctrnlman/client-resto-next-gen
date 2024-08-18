import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoginForm from "../../../../hooks/useLoginForm";
import LoginForm from "./components/LoginForm";
import icon from "../../../../assets/logo/garden-logo.png";
import axiosInstance from "../../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../features/users/user";
import bglogin from "../../../../assets/background/bg-login.jpg";

function LoginCustomer() {
  const {
    emailOrWhatsapp,
    setEmailOrWhatsapp,
    password,
    setPassword,
    errors,
    validate,
  } = useLoginForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      try {
        const response = await axiosInstance.post("/auth/login", {
          emailOrWhatsapp,
          password,
        });

        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data.token);
        dispatch(setUser(response.data.data.user));
        navigate("/");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred during login"
        );
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bglogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl">
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src={icon}
            alt="Garden Sky Restaurant"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <LoginForm
          emailOrWhatsapp={emailOrWhatsapp}
          setEmailOrWhatsapp={setEmailOrWhatsapp}
          password={password}
          setPassword={setPassword}
          errors={errors}
          handleSubmit={handleSubmit}
        />
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don&apos;t have an account yet?
            <a
              href="/register"
              className="font-medium text-green-600 hover:text-green-500 ml-2"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginCustomer;
