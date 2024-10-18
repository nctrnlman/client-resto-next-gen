import { useEffect, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";

const DataTable = ({ rows, columns, loading, onEdit, onDelete }) => {
  const [filterText, setFilterText] = useState(""); // State untuk menyimpan teks filter pencarian
  const [includeOutliers, setIncludeOutliers] = useState(true); // State untuk menyimpan pilihan termasuk outliers
  const apiRef = useGridApiRef(); // Membuat referensi untuk API DataGrid

  // Fungsi untuk menangani perubahan teks filter
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  // Memfilter rows berdasarkan filterText
  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        Object.keys(row).some(
          (field) =>
            typeof row[field] === "string" &&
            row[field].toLowerCase().includes(filterText.toLowerCase())
        )
      )
    : []; // Mengembalikan array kosong jika rows bukan array

  const [page, setPage] = useState(1); // State untuk menyimpan nomor halaman saat ini

  // Fungsi untuk menangani perubahan halaman
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Opsi untuk autosizing kolom
  const autosizeOptions = {
    includeHeaders: true,
    includeOutliers,
  };

  const pageSize = 10; // Jumlah item per halaman
  const pageStartIndex = (page - 1) * pageSize; // Indeks awal halaman
  const pageEndIndex = pageStartIndex + pageSize; // Indeks akhir halaman
  const pageRows = filteredRows.slice(pageStartIndex, pageEndIndex); // Mengambil rows sesuai dengan halaman saat ini

  const totalPages = Math.ceil(filteredRows.length / pageSize); // Menghitung total halaman

  // Menggunakan useEffect untuk melakukan autosizing kolom saat loading
  useEffect(() => {
    apiRef.current.autosizeColumns(autosizeOptions); // Mengatur ukuran kolom secara otomatis
  }, [loading]);

  // Kolom aksi untuk Edit dan Delete
  const actionColumn =
    onEdit || onDelete
      ? {
          field: "actions",
          headerName: "Actions",
          width: 200,
          renderCell: (params) => (
            <div className="flex space-x-2 py-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(params.row)}
                  className="flex items-center justify-center bg-blue-500 text-white px-2 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  title="Edit"
                >
                  <FaEdit className="text-lg" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(params.row)}
                  className="flex items-center justify-center bg-red-500 text-white px-2 py-2 rounded-lg shadow-sm hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                  title="Delete"
                >
                  <FaTrash className="text-lg" />
                </button>
              )}
            </div>
          ),
        }
      : null;
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-4 items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 border border-gray-300 rounded-md py-2 pl-10 pr-4"
            value={filterText}
            onChange={handleFilterChange}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      <div style={{ flexGrow: 1, overflowX: "auto" }}>
        <DataGrid
          autoHeight
          rows={pageRows}
          columns={actionColumn ? [...columns, actionColumn] : columns}
          pageSize={pageSize}
          disableSelectionOnClick
          apiRef={apiRef}
          density="compact"
          pageSizeOptions={[pageSize]}
          slots={{
            loadingOverlay: loading ? LinearProgress : undefined,
          }}
          loading={loading}
          columnBuffer={columns.length}
          columnThreshold={columns.length}
          rowHeight={100}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default DataTable;
