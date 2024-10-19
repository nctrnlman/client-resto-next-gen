import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import TransactionList from "./sections/TransactionList";

// Mendefinisikan komponen TransactionsAdmin
function TransactionsAdmin() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Transactions Page"
            message="Welcome to the Transactions Page. Here you can view and manage all your financial transactions, track payments, and monitor order statuses. If you need assistance, our support team is here to help."
          />
        </div>
        <div className="px-4">
          <TransactionList /> {/* Menampilkan daftar transaksi */}
        </div>
      </main>
    </Layout>
  );
}

export default TransactionsAdmin;
