// Mengimpor komponen dan library yang diperlukan
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoginForm from "../../../hooks/useLoginForm";
import LoginForm from "./components/LoginForm";
import icon from "../../../assets/logo/garden-logo.png";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/users/user";

// Mendefinisikan komponen LoginAdmin
function LoginAdmin() {
  // Menggunakan hook kustom untuk menangani email, password, dan validasi
  const { email, setEmail, password, setPassword, errors, validate } =
    useLoginForm();
  const navigate = useNavigate(); // Mendapatkan fungsi navigasi
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch untuk Redux

  // Fungsi untuk menangani pengiriman form login
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      try {
        // Mengirim permintaan POST untuk login
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });

        // Menampilkan notifikasi sukses
        toast.success("Login successful");
        // Menyimpan token di localStorage
        localStorage.setItem("token", response.data.data.token);
        // Dispatch aksi untuk menyimpan data pengguna di Redux
        dispatch(setUser(response.data.data.user));
        // Mengarahkan pengguna ke halaman admin home
        navigate("/admin/home");
      } catch (error) {
        toast.error(
          "Login failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
  };

  // Render tampilan komponen
  return (
    <div>
      <ToastContainer /> {/* Komponen untuk menampilkan notifikasi */}
      <section className="bg-gray-50">
        {" "}
        {/* Bagian utama dengan latar belakang abu-abu */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="h-44 mr-2" src={icon} alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login to your account
              </h1>
              {/* Menggunakan komponen LoginForm dengan props yang diperlukan */}
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginAdmin;
