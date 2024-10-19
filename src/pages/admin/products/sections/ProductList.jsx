import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import DataTable from "../../../../components/common/tables/DataTable";
import AddModal from "../../../../components/common/cards/AddModal";
import EditModal from "../../../../components/common/cards/EditModal";
import DeleteModal from "../../../../components/common/cards/DeleteModal";
import useFetchProducts from "../../../../hooks/useFetchProducts";
import { toast } from "react-toastify";
import useCategories from "../../../../hooks/useCategories";
import { formatCurrencyToIDR } from "../../../../utils/formatters";

// Mendefinisikan komponen ProductList
const ProductList = () => {
  // Mengambil data produk dan status loading/error dari hook useFetchProducts
  const { products, loading, error, refetch } = useFetchProducts();
  // Mengambil kategori dari hook useCategories
  const { categories } = useCategories();

  // State untuk produk yang dipilih dan status modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Fungsi untuk menambahkan produk
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post("/products", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      refetch(); // Memperbarui daftar produk
      setAddModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  // Fungsi untuk mengatur produk yang dipilih untuk diedit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  // Fungsi untuk mengatur produk yang dipilih untuk dihapus
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  // Fungsi untuk mengirimkan perubahan produk yang diedit
  const handleEditSubmit = async (updatedProduct) => {
    try {
      const response = await axiosInstance.put(
        `/products/${selectedProduct.id}`, // Mengupdate produk berdasarkan ID
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch(); // Memperbarui daftar produk
      setEditModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    }
  };

  // Fungsi untuk mengonfirmasi penghapusan produk
  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(
        `/products/${selectedProduct.id}`, // Menghapus produk berdasarkan ID
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      refetch();
      setDeleteModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  // Mendefinisikan kolom-kolom untuk DataTable
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "product_name", headerName: "Name", width: 200 },
    {
      field: "product_price",
      headerName: "Price",
      width: 150,
      renderCell: (params) => formatCurrencyToIDR(params.value),
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      renderCell: (params) => (
        <p>{params.row.Category?.category_name || "N/A"}</p>
      ),
    },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "product_image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          className="w-16 h-16 object-cover"
        />
      ),
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-teal-500 text-white px-4 py-2 rounded-md"
      >
        Add Product
      </button>
      <DataTable
        rows={products}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddProduct}
        fields={[
          { name: "product_name", label: "Name", type: "text", required: true },
          {
            name: "product_price",
            label: "Price",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category",
            type: "select",
            required: true,
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
          },
          {
            name: "product_image",
            label: "Image URL",
            type: "text",
            required: false,
          },
        ]}
        options={{
          category_id: categories.map((category) => ({
            value: category.id,
            label: category.category_name,
          })),
        }}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedProduct}
        fields={[
          { name: "product_name", label: "Name", type: "text", required: true },
          {
            name: "product_price",
            label: "Price",
            type: "text",
            required: true,
          },
          {
            name: "category_id",
            label: "Category",
            type: "select",
            required: true,
            options: categories.map((category) => ({
              value: category.id,
              label: category.category_name,
            })),
          },
          {
            name: "description",
            label: "Description",
            type: "textarea",
            required: false,
          },
          {
            name: "product_image",
            label: "Image URL",
            type: "text",
            required: false,
          },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ProductList;
