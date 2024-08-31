import { useState } from "react";
import ava from "../../../assets/profile/ava.png";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Topbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((state) => state.user.User);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    toast.success("Logout success");
    setIsDropdownOpen(false);
    if (location.pathname.includes("admin")) {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  const handleToggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
    toggleSidebar();
  };

  return (
    <nav className="relative top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              onClick={handleToggleSidebar}
              className="inline-flex items-center justify-center w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Toggle sidebar</span>
              <div className="w-6 h-6 relative flex items-center justify-center">
                <span
                  className={`absolute w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`absolute w-5 h-0.5 bg-gray-600 transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ease-in-out ${
                    isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
            <a className="flex ms-2 md:me-24"></a>
          </div>

          <div className="flex items-center relative">
            <div className="flex items-center ms-3">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={ava}
                  alt="user photo"
                />
              </button>
              {isDropdownOpen && (
                <div
                  className="z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                  id="dropdown-user"
                  style={{ top: "100%" }}
                >
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900" role="none">
                      {userData.name}
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate"
                      role="none"
                    >
                      {userData.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                        role="menuitem"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
