import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../features/products/product";
import useCategories from "../../../../hooks/useCategories";
import ProductCard from "../../../../components/common/cards/ProductCard";
import { useLocation } from "react-router-dom";

// Membuat hook kustom untuk mendapatkan parameter query dari URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search); // Mengembalikan parameter query dari URL
};

// Mendefinisikan komponen ProductList
function ProductList() {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
  const { products, productStatus, error } = useSelector(
    (state) => state.products // Mengambil state produk dari Redux
  );
  const { categories, status: categoriesStatus } = useCategories(); // Mengambil kategori dan statusnya

  const query = useQuery(); // Menggunakan hook kustom untuk mendapatkan parameter query
  const initialCategoryId = query.get("categoryId") || ""; // Mengambil categoryId dari query, default ke string kosong jika tidak ada

  // State untuk kategori yang dipilih dan istilah pencarian
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [searchTerm, setSearchTerm] = useState("");

  // Effect untuk mengatur kategori yang dipilih saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search: searchTerm }));
  }, [selectedCategory, searchTerm, dispatch]);

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Menampilkan loading jika status produk sedang dimuat
  if (productStatus === "loading") {
    return <div className="text-center text-lg">Loading...</div>;
  }

  // Menampilkan error jika status produk gagal
  if (productStatus === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render tampilan komponen
  return (
    <div>
      <div className="p-4">
        {/* Input untuk pencarian */}
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
        {/* Dropdown untuk memilih kategori */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded ml-2"
        >
          <option value="">All Categories</option>
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
          <ProductCard key={product.id} product={product} /> // Menampilkan komponen ProductCard untuk setiap produk
        ))}
      </div>
    </div>
  );
}

export default ProductList;
