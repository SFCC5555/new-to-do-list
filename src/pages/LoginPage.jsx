import { useState } from "react";
import { postRequest } from "../api/post";
import { validateEmail } from "../utils/validation/validateEmail";
import { validatePassword } from "../utils/validation/validatePassword";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/profileSlice";
import { getRequest } from "../api/get";
//import { updateToken } from "../redux/tokenSlice";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //const token = useSelector((state) => state.token);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  const [validateInputError, setValidateInputError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValidateInputError((prevErrors) => ({
      ...prevErrors,
      auth: null,
      [name]: null,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailValidation = validateEmail(
      formData.email,
      setValidateInputError
    );
    const passwordValidation = validatePassword(
      formData.password,
      setValidateInputError
    );
    if (emailValidation && passwordValidation) {
      const login = await postRequest(formData, "login");
      if (login.status) {
        const token = await login.data.user.token;
        Cookies.set("token", token);
        console.log("TOKEN: ", Cookies.get("token"));
        const profile = await getRequest("profile");
        dispatch(updateProfile(profile));
        navigate("/");
      } else {
        setValidateInputError((prevErrors) => ({
          ...prevErrors,
          auth: "Invalid email or password",
        }));
      }
    }
  };

  return (
    <div className="sm:w-1/2 md:w-1/3 rounded-md dark-bg p-5">
      <form
        className="w-full flex flex-col items-center justify-between gap-5"
        onSubmit={handleSubmit}
      >
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} className="w-full">
            <input
              onChange={handleInputChange}
              value={value}
              type={field === "password" && hidePassword ? "password" : "text"}
              name={field}
              placeholder={field}
              maxLength={field === "password" ? 16 : 100}
              className={`w-full p-2 ${
                field === "password" && "pr-8"
              } rounded-md text-sm light-bg text-white opacity-75 hover:opacity-100`}
            />
            {field === "password" && (
              <i
                onClick={() => setHidePassword((prev) => !prev)}
                className={`absolute -translate-x-full p-2 cursor-pointer opacity-50 hover:opacity-75 bi bi-eye${
                  !hidePassword ? "-slash" : ""
                }`}
              />
            )}
            {validateInputError[field] && (
              <p className="text-red-400 pt-2 pl-1 text-xs">
                {validateInputError[field]}
              </p>
            )}
          </div>
        ))}
        {validateInputError.auth && (
          <p className="text-red-400 text-xs sm:text-sm">
            {validateInputError.auth}
          </p>
        )}
        <button
          type="submit"
          className="main-bg opacity-75 hover:opacity-100 text-sm p-3 hover:scale-105 rounded-md"
        >
          LOGIN
        </button>
      </form>
      <div className="flex items-center justify-between w-full text-xs mt-6">
        <p>{"Don't have an account?"}</p>
        <Link
          to="/register"
          className="text-blue-400 opacity-90 hover:opacity-100"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export { LoginPage };
