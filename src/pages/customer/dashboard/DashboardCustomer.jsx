import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";

import ProductList from "./sections/ProductList"; // Komponen untuk menampilkan daftar produk

function DashboardCustomer() {
  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Welcome to Our Resto" // Judul banner
            message="Hello! We're glad to have you here. Explore our wide range of products and manage your orders easily. If you need any help, feel free to reach out to our support team." // Pesan dalam banner
            page="home" // Indikasi halaman saat ini
          />
        </div>
        <div>
          <ProductList />
        </div>
      </main>
    </Layout>
  );
}

export default DashboardCustomer;
