import React from "react";
import { motion } from "framer-motion";

const LoginForm = ({
  emailOrWhatsapp, // State untuk menyimpan nilai email atau nomor WhatsApp
  setEmailOrWhatsapp, // Fungsi untuk mengatur nilai email atau nomor WhatsApp
  password, // State untuk menyimpan nilai password
  setPassword, // Fungsi untuk mengatur nilai password
  errors, // Objek untuk menyimpan pesan kesalahan validasi
  handleSubmit, // Fungsi untuk menangani submit form
}) => {
  return (
    <motion.form
      className="space-y-6"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <label
          htmlFor="emailOrWhatsapp"
          className="block text-sm font-medium text-gray-700"
        >
          Email address or WhatsApp number
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="emailOrWhatsapp"
            id="emailOrWhatsapp"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-300 ease-in-out hover:shadow-md"
            placeholder="you@example.com or 1234567890"
            value={emailOrWhatsapp}
            onChange={(e) => setEmailOrWhatsapp(e.target.value)}
          />
        </div>
        {errors.emailOrWhatsapp && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            id="emailOrWhatsapp-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.emailOrWhatsapp}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-all duration-300 ease-in-out hover:shadow-md"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            id="password-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      {/* Tombol untuk submit form */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Sign in
        </button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
