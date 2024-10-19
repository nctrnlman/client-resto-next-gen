import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutCustomer";
import CategoryList from "./sections/CategoryList";

function CategoriesCustomer() {
  return (
    <Layout>
      {" "}
      {/* Menggunakan layout umum untuk halaman pelanggan */}
      <main className="flex flex-col gap-4 ">
        <div className="p-4">
          <DashboardBanner
            title="Categories" // Judul untuk banner
            message="Explore our diverse menu categories. From appetizers to desserts, find the perfect dish for your taste." // Pesan dalam banner
            page="categories" // Nama halaman untuk identifikasi di komponen banner
          />
        </div>
        <div>
          <CategoryList /> {/* Menampilkan daftar kategori yang tersedia */}
        </div>
      </main>
    </Layout>
  );
}

export default CategoriesCustomer;
