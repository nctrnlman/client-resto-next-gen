import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  // Fungsi untuk menangani klik pada tombol 'See Products'
  const handleSeeProductsClick = () => {
    navigate(`/?categoryId=${category.id}`); // Menavigasi ke halaman produk dengan ID kategori yang dipilih
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105">
      <img
        src={category.category_image}
        alt={category.category_name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{category.category_name}</h2>{" "}
        {/* Menampilkan nama kategori */}
        <button
          onClick={handleSeeProductsClick}
          className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          See Products{/* Teks pada tombol */}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
