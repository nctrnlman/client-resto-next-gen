import DashboardBanner from "../../../components/common/cards/DashboardBanner";
import Layout from "../../../components/common/layouts/LayoutAdmin";
import ProductList from "./sections/ProductList";

// Mendefinisikan komponen ProductsAdmin
function ProductsAdmin() {
  return (
    // Menggunakan Layout untuk menyusun halaman
    <Layout>
      <main className="flex flex-col gap-4 ">
        {" "}
        {/* Mengatur tampilan utama dalam kolom dengan jarak antar elemen */}
        <div className="p-4">
          {/* Menampilkan DashboardBanner dengan judul dan pesan */}
          <DashboardBanner
            title="Products Page"
            message="Welcome to the Products Page. Browse through our extensive collection of products, view detailed information, and manage your inventory seamlessly. For any assistance, our support team is here to help."
          />
        </div>
        <div className="px-4">
          <ProductList /> {/* Menampilkan daftar produk */}
        </div>
      </main>
    </Layout>
  );
}

export default ProductsAdmin;
