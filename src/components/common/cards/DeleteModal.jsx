const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  // Jika modal tidak terbuka, tidak merender apa-apa
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>{" "}
        {/* Judul modal */}
        <p className="mb-4">Are you sure you want to delete {itemName}?</p>{" "}
        {/* Pesan konfirmasi dengan nama item yang akan dihapus */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel {/* Teks tombol Cancel */}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete {/* Teks tombol Delete */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
