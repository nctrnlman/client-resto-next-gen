import { useState } from "react";
import createValidationSchema from "../../../utils/validationSchema";

const AddModal = ({ isOpen, onClose, onSubmit, fields, options }) => {
  // Inisialisasi state untuk menyimpan data formulir dan error
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}) // Membuat objek dengan nama field sebagai key dan value sebagai string kosong
  );
  const [errors, setErrors] = useState({});

  const validationSchema = createValidationSchema(fields); // Membuat skema validasi berdasarkan fields

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Memperbarui state formData
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah pengiriman default formulir
    try {
      await validationSchema.validate(formData, { abortEarly: false }); // Validasi data menggunakan skema
      onSubmit(formData); // Panggil fungsi onSubmit dengan data formulir
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}) // Reset formData setelah submit
      );
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(formattedErrors);
    }
  };

  if (!isOpen) return null; // Jika modal tidak terbuka, tidak mengembalikan apa-apa

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Modal</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium">
                {field.label}
              </label>
              {field.type === "select" ? ( // Menentukan tipe input berdasarkan field
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange} // Fungsi handleChange dipanggil saat ada perubahan
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Select {field.label}</option>
                  {options[field.name]?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="4"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
