import DeleteModal from "../../../../components/common/cards/DeleteModal";
import EditModal from "../../../../components/common/cards/EditModal";
import DataTable from "../../../../components/common/tables/DataTable";
import useFetchUsers from "../../../../hooks/useFetchUsers";
import { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import AddModal from "../../../../components/common/cards/AddModal";
import { toast } from "react-toastify";

const UserList = () => {
  // Mengambil data pengguna, status loading, dan error dari custom hook
  const { users, loading, error, refetch } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState(null); // Menyimpan pengguna yang dipilih untuk edit atau hapus
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State untuk mengelola tampilan modal tambah pengguna
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State untuk mengelola tampilan modal edit pengguna
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State untuk mengelola tampilan modal konfirmasi hapus pengguna

  // Fungsi untuk menambah pengguna baru
  const handleAddUser = async (newUser) => {
    try {
      const userWithRole = { ...newUser, role: 1 }; // Menambahkan role default ke pengguna baru

      const response = await axiosInstance.post(
        "/auth/register", // Endpoint untuk menambahkan pengguna
        userWithRole,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Menambahkan token otentikasi
        }
      );
      refetch(); // Memperbarui daftar pengguna setelah penambahan
      setAddModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error(error.response?.data?.message || "Failed to add user");
    }
  };

  // Fungsi untuk mengedit pengguna
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Fungsi untuk menghapus pengguna
  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Fungsi untuk mengirim data pengguna yang telah diedit
  const handleEditSubmit = async (updatedUser) => {
    try {
      const response = await axiosInstance.put(
        `/users/${selectedUser.id}`, // Endpoint untuk memperbarui pengguna berdasarkan ID
        updatedUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Menambahkan token otentikasi
        }
      );
      refetch(); // Memperbarui daftar pengguna setelah pengeditan
      setEditModalOpen(false); // Menutup modal setelah berhasil
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // Fungsi untuk mengonfirmasi penghapusan pengguna
  const handleDeleteConfirm = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${selectedUser.id}`, {
        // Endpoint untuk menghapus pengguna
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Menambahkan token otentikasi
      });
      refetch(); // Memperbarui daftar pengguna setelah penghapusan
      setDeleteModalOpen(false); // Menutup modal setelah berhasil
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Definisi kolom untuk tabel pengguna
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Role",
      width: 250,
      renderCell: (params) => {
        const role = params.value;
        return role === 1 ? "Admin" : role === 2 ? "Customer" : "Unknown";
      },
    },
  ];

  // Menangani kasus error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render tampilan daftar pengguna
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <button
        onClick={() => setAddModalOpen(true)}
        className="mb-4 bg-teal-500 text-white px-4 py-2 rounded-md"
      >
        Add User
      </button>
      <DataTable
        rows={users}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddUser}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: false,
          },
        ]}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedUser || {}}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
        ]}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={selectedUser?.name || "User"}
      />
    </div>
  );
};

export default UserList;
