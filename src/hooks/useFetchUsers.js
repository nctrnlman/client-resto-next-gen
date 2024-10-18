import { useEffect, useState } from "react";
import axios from "axios";

const useFetchUsers = () => {
  // Menggunakan state untuk menyimpan nilai dari input form
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil daftar pengguna
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data.data); // Mengatur state users dengan data yang diterima
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Mengambil pengguna saat komponen dipasang
  useEffect(() => {
    fetchUsers();
  }, []);

  // Mengembalikan state dan fungsi yang diperlukan
  return { users, loading, error, refetch: fetchUsers };
};

export default useFetchUsers;
