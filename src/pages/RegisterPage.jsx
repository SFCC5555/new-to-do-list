import { useState } from "react";
import { postRequest } from "../api/auth";
import { validateUsername } from "../utils/validation/validateUsername";
import { validateEmail } from "../utils/validation/validateEmail";
import { validatePassword } from "../utils/validation/validatePassword";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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
    if (
      validateUsername(formData.username, setValidateInputError) &&
      validateEmail(formData.email, setValidateInputError) &&
      validatePassword(formData.password, setValidateInputError)
    ) {
      const isRegister = await postRequest(formData, "register");
      if (isRegister) {
        navigate("/");
      } else {
        setValidateInputError((prevErrors) => ({
          ...prevErrors,
          auth: "Username or email already in use",
        }));
      }
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-between gap-5 p-5 rounded-md  sm:w-1/2 md:w-1/3 dark-bg"
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
          REGISTER
        </button>
      </form>
    </>
  );
};

export { RegisterPage };
