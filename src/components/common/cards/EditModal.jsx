import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import createValidationSchema from "../../../utils/validationSchema"; // Update the path accordingly

const EditModal = ({ isOpen, onClose, onSubmit, initialData, fields }) => {
  const [formData, setFormData] = useState(initialData || {}); // State untuk menyimpan data form
  const [errors, setErrors] = useState({}); // State untuk menyimpan pesan kesalahan validasi

  const validationSchema = createValidationSchema(fields); // Membuat skema validasi berdasarkan field yang diberikan

  // Effect untuk mengupdate formData dan errors saat initialData atau isOpen berubah
  useEffect(() => {
    setFormData(initialData || {});
    setErrors({});
  }, [initialData, isOpen]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Fungsi untuk menangani penyimpanan data
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false }); // Validasi formData
      await onSubmit(formData); // Memanggil fungsi onSubmit dengan data yang sudah divalidasi
      setFormData(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
      );
      setErrors({});
      onClose();
    } catch (validationErrors) {
      const formattedErrors = validationErrors.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(formattedErrors);
      toast.error("Please correct the errors in the form");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Modal</h2>{" "}
        {/* Judul modal */}
        <form onSubmit={handleSave}>
          {" "}
          {/* Form untuk input data */}
          {fields.map(
            (
              field // Mengiterasi setiap field untuk membuat input yang sesuai
            ) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium"
                >
                  {field.label}
                </label>
                {field.type === "select" ? ( // Jika field adalah select
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  >
                    {field.options.map(
                      (
                        option // Mengiterasi opsi untuk select
                      ) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                ) : field.type === "textarea" ? ( // Jika field adalah textarea
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.label}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                    rows="4"
                  />
                ) : (
                  // Jika field adalah input text
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    placeholder={field.label}
                    className={`mt-1 p-2 border border-gray-300 rounded-md w-full ${
                      errors[field.name] ? "border-red-500" : ""
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            )
          )}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
