import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../features/products/product";
import useCategories from "../../../../hooks/useCategories";
import ProductCard from "../../../../components/common/cards/ProductCard";
import { useLocation } from "react-router-dom";

// Mendefinisikan hook kustom untuk mengambil query parameters dari URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Mendefinisikan komponen ProductList
function ProductList() {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch untuk mengirim aksi ke Redux
  const { products, productStatus, error } = useSelector(
    (state) => state.products // Mengambil state produk dari Redux
  );
  const { categories, status: categoriesStatus } = useCategories(); // Mengambil kategori dan statusnya

  const query = useQuery(); // Mengambil query parameters dari URL
  const initialCategoryId = query.get("categoryId") || ""; // Mengambil categoryId dari query atau kosong jika tidak ada

  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId); // State untuk kategori yang dipilih
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian

  // Mengambil produk berdasarkan kategori dan kata kunci pencarian
  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search: searchTerm }));
  }, [selectedCategory, searchTerm, dispatch]);

  // Mengatur selectedCategory jika ada initialCategoryId
  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Menampilkan loading jika status produk sedang loading
  if (productStatus === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Menampilkan error jika status produk gagal
  if (productStatus === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render tampilan produk
  return (
    <div>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded ml-2"
        >
          <option value="">All Categories</option>
          {/* Menampilkan kategori jika statusnya berhasil */}
          {categoriesStatus === "succeeded" &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
