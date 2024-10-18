import { useState } from "react";
import Topbar from "./Topbar";
import SidebarCustomer from "./SidebarCustomer";

const LayoutCustomer = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk mengelola apakah sidebar terbuka atau tidak

  // Fungsi untuk membalikkan status sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mengembalikan elemen JSX
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar toggleSidebar={toggleSidebar} />{" "}
      {/* Menampilkan Topbar dan mengoper fungsi toggleSidebar */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarCustomer isOpen={isSidebarOpen} onClose={toggleSidebar} />{" "}
        {/* Menampilkan SidebarCustomer dengan status terbuka dan fungsi penutupan */}
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-1" : "ml-1"
          }`}
        >
          {children}{" "}
          {/* Menampilkan konten anak yang diberikan kepada LayoutCustomer */}
        </main>
      </div>
    </div>
  );
};

export default LayoutCustomer;
