import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import garden from "../../../assets/logo/garden-logo.png";

const SidebarCustomer = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/", icon: DashboardIcon, title: "Home" },
    {
      path: "/categories",
      icon: CategoryIcon,
      title: "Categories",
    },
    {
      path: "/bill",
      icon: BillIcon,
      title: "Bill",
    },
  ];

  function DashboardIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 13h7v7H3v-7zm0-8h7v7H3V5zm8 8h7v7h-7v-7zm0-8h7v7h-7V5zm8 16h7v-7h-7v7z" />
      </svg>
    );
  }

  function BillIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/bill" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7 2h10c1.1 0 2 .9 2 2v16.92c0 .58-.4 1.08-.97 1.21-.5.11-.98-.15-1.2-.6L14 18l-2 3-2-3-2.83 5.53c-.22.45-.7.71-1.2.6-.57-.13-.97-.63-.97-1.21V4c0-1.1.9-2 2-2zm1 14h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V8z" />
      </svg>
    );
  }

  function CategoryIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/categories" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" />
      </svg>
    );
  }

  const handlePageClick = (pagePath) => {
    setActivePage(pagePath);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 sm:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside
        id="default-sidebar"
        className={`fixed sm:relative left-0 z-20 sm:z-0 h-screen transition-transform ${
          isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full sm:translate-x-0 sm:w-16"
        } bg-white `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border right-full shadow-lg">
          <ul className="space-y-2 font-medium">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.path}
                  className={`flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group ${
                    activePage === page.path ? "font-bold bg-gray-200" : ""
                  }`}
                  onClick={() => handlePageClick(page.path)}
                >
                  <page.icon />
                  {isOpen && <span className="ms-3">{page.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex justify-center items-center pt-10 md:text-lg">
            {isOpen ? (
              <>
                <img src={garden} className="h-44 me-3" alt="Company Logo" />
              </>
            ) : (
              <img src={garden} className="h-8" alt="Company Logo" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarCustomer;
