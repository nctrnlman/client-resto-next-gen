import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterForm from "../../../../hooks/useRegisterForm";
import RegisterForm from "./components/RegisterForm";
import icon from "../../../../assets/logo/garden-logo.png";
import axiosInstance from "../../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterCustomer() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    role,
    errors,
    validate,
  } = useRegisterForm();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await validate()) {
      try {
        const response = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
          role: role || "2",
        });

        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
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
                Register your account
              </h1>
              <RegisterForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                handleSubmit={handleSubmit}
              />
              <div className="flex flex-col items-center mt-6">
                <p className="mt-4 text-sm text-gray-600">
                  Already have an account?
                  <a
                    href="/login"
                    className="text-teal-500 pl-2 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterCustomer;
