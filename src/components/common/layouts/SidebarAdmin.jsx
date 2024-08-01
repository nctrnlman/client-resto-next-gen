import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import codenito from "../../../assets/logo/icon-dark.png";

const SidebarAdmin = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const pages = [
    { path: "/admin/dashboard", icon: DashboardIcon, title: "Dashboard" },
    {
      path: "/admin/orders",
      icon: OrdersIcon,
      title: "Order List",
    },
  ];

  function DashboardIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/marketing/dashboard"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
      </svg>
    );
  }

  function OrdersIcon() {
    return (
      <svg
        className={`w-5 h-5 transition duration-75  group-hover:text-teal-500  ${
          activePage === "/marketing/attendance"
            ? "text-teal-500"
            : "text-gray-500"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11 22v-2H5c-1.11 0-1.99-.89-1.99-2L3 5c0-1.11.89-2 2-2h10c1.11 0 2 .89 2 2v13c0 1.11-.89 2-2 2h-6v2h4c1.11 0 2-.89 2-2V5h2v15h-8zM5 5v13h6V5H5z" />
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

export default SidebarAdmin;
