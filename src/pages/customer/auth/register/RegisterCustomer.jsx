import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterForm from "../../../../hooks/useRegisterForm";
import RegisterForm from "./components/RegisterForm";
import icon from "../../../../assets/logo/garden-logo.png";
import axiosInstance from "../../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import bgregister from "../../../../assets/background/bg-login.jpg";
import { motion } from "framer-motion";

function RegisterCustomer() {
  // Menggunakan custom hook untuk mengelola state form
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    noWhatsapp,
    setNoWhatsapp,
    role,
    errors,
    validate,
  } = useRegisterForm();
  const navigate = useNavigate();

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      try {
        // Mengirim data registrasi ke server
        const response = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
          no_whatsapp: noWhatsapp,
          role: role || "2", // Default role jika tidak diisi adalah "2"
        });

        // Menampilkan notifikasi sukses
        toast.success(response.data.message);
        navigate("/login"); // Mengarahkan ke halaman login setelah berhasil registrasi
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred during registration"
        );
      }
    }
  };

  // Variabel animasi untuk kontainer
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  // Variabel animasi untuk item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${bgregister})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.img
            className="mx-auto h-24 w-auto"
            src={icon}
            alt="Garden Sky Restaurant"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          />
          <motion.h2
            className="mt-6 text-3xl font-extrabold text-gray-900"
            variants={itemVariants}
          >
            Create your account
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-gray-600"
            variants={itemVariants}
          >
            Join Garden Sky Restaurant
          </motion.p>
        </div>
        <RegisterForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          noWhatsapp={noWhatsapp}
          setNoWhatsapp={setNoWhatsapp}
          errors={errors}
          handleSubmit={handleSubmit}
        />
        <motion.div className="text-center" variants={itemVariants}>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?
            <a
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 ml-2 transition-colors duration-300"
            >
              Log in here
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default RegisterCustomer;
