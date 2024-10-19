import React from "react";
import { motion } from "framer-motion";

const RegisterForm = ({
  name, // Nama pengguna
  setName, // Fungsi untuk mengubah nama
  email, // Email pengguna
  setEmail, // Fungsi untuk mengubah email
  password, // Password pengguna
  setPassword, // Fungsi untuk mengubah password
  noWhatsapp, // Nomor WhatsApp pengguna
  setNoWhatsapp, // Fungsi untuk mengubah nomor WhatsApp
  errors, // Objek untuk menyimpan pesan kesalahan
  handleSubmit, // Fungsi untuk menangani saat form disubmit
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
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Your name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.name}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <label
          htmlFor="whatsapp"
          className="block text-sm font-medium text-gray-700"
        >
          WhatsApp number
        </label>
        <input
          type="tel"
          name="whatsapp"
          id="whatsapp"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder="1234567890"
          value={noWhatsapp}
          onChange={(e) => setNoWhatsapp(e.target.value)}
          required
        />
        {errors.noWhatsapp && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.noWhatsapp}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Register
        </button>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;
