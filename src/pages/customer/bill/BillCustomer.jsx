import { motion } from "framer-motion";
import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";
import BillCard from "./components/BillCard";

function BillCustomer() {
  return (
    <Layout>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-4"
        >
          <DashboardBanner
            title="Bill Page"
            message="Review your order details and total bill here. If you have any questions about your bill, our staff is here to help."
            page="bill"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <BillCard />
        </motion.div>
      </motion.main>
    </Layout>
  );
}

export default BillCustomer;
