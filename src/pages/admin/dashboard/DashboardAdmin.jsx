import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";

import ProductList from "./sections/ProductList";

// Mendefinisikan komponen DashboardAdmin
function DashboardAdmin() {
  return (
    // Menggunakan komponen Layout untuk struktur halaman
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          {/* Menampilkan DashboardBanner dengan judul dan pesan */}
          <DashboardBanner
            title="Welcome back, Admin!"
            message="We're excited to see you again. Dive into your dashboard to manage users, track orders, and oversee product inventory. If you have any questions or need assistance, our support team is here to help."
          />
        </div>
        <div>
          <ProductList /> {/* Menampilkan daftar produk */}
        </div>
      </main>
    </Layout>
  );
}

export default DashboardAdmin;
