const validateUsername = (username, setValidateInputError) => {
  setValidateInputError((prevErrors) => ({
    ...prevErrors,
    username: "Error mijin",
  }));
  return true;
};

export { validateUsername };
