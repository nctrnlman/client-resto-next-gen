import useCategories from "../../../../hooks/useCategories";
import CategoryCard from "../../../../components/common/cards/CategoryCard";

const CategoryList = () => {
  const { categories, status, error } = useCategories(); // Mengambil data kategori, status, dan error menggunakan custom hook `useCategories`

  let content;

  // Menentukan konten yang akan ditampilkan berdasarkan status pengambilan data
  if (status === "loading") {
    content = <div>Loading...</div>; // Jika data sedang diambil, tampilkan pesan loading
  } else if (status === "succeeded") {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} /> // Tampilkan kartu untuk setiap kategori
        ))}
      </div>
    );
  } else if (status === "failed") {
    // Jika pengambilan data gagal, tampilkan pesan error
    content = (
      <div>{error ? error.join(", ") : "Failed to fetch categories"}</div>
    );
  }

  return <div>{content}</div>; // Render konten yang sesuai
};

export default CategoryList;
