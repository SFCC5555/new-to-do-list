import { useState } from "react";
import { postRequest } from "../api/auth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postRequest(formData, "register");
  };

  return (
    <>
      <form
        className="flex flex-col items-center justify-between gap-5 p-5 rounded-md  w-1/2 md:w-1/3 dark-bg"
        onSubmit={handleSubmit}
      >
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            onChange={handleInputChange}
            value={formData[field]}
            type="text"
            name={field}
            placeholder={field}
            className="w-full p-2 rounded-md text-sm light-bg text-white opacity-75 hover:opacity-100"
          />
        ))}
        <button
          type="submit"
          className="main-bg opacity-75 hover:opacity-100 text-sm p-3 rounded-md"
        >
          REGISTER
        </button>
      </form>
    </>
  );
};

export { RegisterPage };
