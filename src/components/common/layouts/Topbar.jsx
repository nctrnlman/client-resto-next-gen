import { useState } from "react";
import logo from "../../../assets/logo/icon-dark.png";
// import logo from "../../assets/logo/sms-logo.jpeg";
import ava from "../../../assets/profile/ava.png";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const userData = useSelector((state) => state.user.User);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user_token");
    toast.success("Logout success");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const isAdminPage = location.pathname.includes("admin");

  return (
    <nav className="relative top-0 z-40 w-full bg-white border-b border-gray-200 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
              <span className="sr-only">Toggle sidebar</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <a className="flex ms-2 md:me-24">
              <img src={logo} className="h-16 me-3" alt="Company Logo" />
              <span className="self-center text-xl font-medium sm:text-2xl whitespace-nowrap ">
                Codenito
              </span>
            </a>
          </div>
          {isAdminPage && (
            <div className="flex items-center relative">
              <div className="flex items-center ms-3">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 "
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
                    className="z-50 absolute right-0 mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow "
                    id="dropdown-user"
                    style={{ top: "100%" }}
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm text-gray-900 " role="none">
                        {/* {userData.name} */} Nama
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate "
                        role="none"
                      >
                        {/* {userData.email} */} Email
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:cursor-pointer"
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
