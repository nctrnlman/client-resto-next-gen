import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/categories/category";

const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories // Mengambil kategori, status, dan error dari state Redux
  );

  // Menggunakan useEffect untuk mem-fetch kategori saat status idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories()); // Mengirim action untuk mengambil kategori
    }
  }, [status, dispatch]); // Menjalankan efek jika status atau dispatch berubah

  return { categories, status, error };
};

export default useCategories;
