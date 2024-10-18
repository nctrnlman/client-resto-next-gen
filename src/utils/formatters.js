export const formatCurrencyToIDR = (value) => {
  if (typeof value !== "string") return value; // Mengembalikan nilai asli jika bukan string
  const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, "")); // Menghapus karakter non-numeric
  if (isNaN(numberValue)) return value; // Mengembalikan nilai asli jika hasilnya NaN
  return new Intl.NumberFormat("id-ID", {
    // Memformat angka ke format IDR
    style: "currency",
    currency: "IDR",
  }).format(numberValue);
};

export const formatDateTime = (dateString) => {
  if (!dateString) return dateString; // Mengembalikan nilai asli jika dateString kosong
  const date = new Date(dateString); // Mengonversi string menjadi objek Date
  return date.toLocaleString("id-ID", {
    // Memformat tanggal dan waktu dalam format lokal Indonesia
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
