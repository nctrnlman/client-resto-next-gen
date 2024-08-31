import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { LayoutList } from "lucide-react"; // Ganti Category dengan LayoutList
import { Receipt } from "lucide-react";

const DashboardBanner = ({ title, message, page }) => {
  const getIcon = () => {
    switch (page) {
      case "home":
        return <Home className="h-12 w-12 md:h-16 md:w-16 text-white" />;
      case "categories":
        return <LayoutList className="h-12 w-12 md:h-16 md:w-16 text-white" />; // Menggunakan LayoutList
      case "bill":
        return <Receipt className="h-12 w-12 md:h-16 md:w-16 text-white" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative p-6 md:p-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4 font-serif"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-lg md:text-xl max-w-3xl"
        >
          {message}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-24 h-24 md:w-32 md:h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
        >
          {getIcon()}
        </motion.div>
      </div>
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.8, duration: 1 }}
        className="h-1 bg-white bg-opacity-30"
      />
    </motion.div>
  );
};

export default DashboardBanner;
