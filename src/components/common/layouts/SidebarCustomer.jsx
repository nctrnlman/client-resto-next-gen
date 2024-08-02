import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import codenito from "../../../assets/logo/icon-dark.png";

const SidebarCustomer = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/", icon: DashboardIcon, title: "Home" },
    {
      path: "/favorite",
      icon: FavoriteIcon,
      title: "Favorite",
    },
    {
      path: "/categories",
      icon: CategoryIcon,
      title: "Categories",
    },
  ];

  function DashboardIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/home" ? "text-teal-500" : "text-gray-500"
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

  function FavoriteIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75 group-hover:text-teal-500 ${
          activePage === "/favorite" ? "text-teal-500" : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
                <p>Supported by</p>
                <img src={codenito} className="h-8 me-3" alt="Company Logo" />
              </>
            ) : (
              <img src={codenito} className="h-8" alt="Company Logo" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarCustomer;
