export const handleSignUPValidation = (formData, setErrors) => {
  let hasError = false;

  if (!formData.firstname?.trim()) {
    hasError = true;
    setErrors((prev) => ({ ...prev, firstname: "Enter First name" }));
  } else if (formData.firstname.trim().length < 3) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      firstname: "First Name should be at least 3 characters long.",
    }));
  } else if (!/^[A-Za-z\s'-]+$/.test(formData.firstname.trim())) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      firstname:
        "First Name can contain only letters, spaces, apostrophes or hyphens.",
    }));
  }

  if (!formData.lastname?.trim()) {
    hasError = true;
    setErrors((prev) => ({ ...prev, lastname: "Enter a Last Name" }));
  } else if (formData.lastname.trim().length < 3) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      lastname: "LastName should be at least 3 characters long.",
    }));
  } else if (!/^[A-Za-z\s'-]+$/.test(formData.lastname.trim())) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      lastname:
        "LastName can contain only letters, spaces, apostrophes or hyphens.",
    }));
  }

  //  Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!formData.email?.trim()) {
    hasError = true;
    setErrors((prev) => ({ ...prev, email: "Enter an email address" }));
  } else if (!emailRegex.test(formData.email)) {
    hasError = true;
    setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
  }

  // Password validation
  const password = formData.password || "";
  if (password.length < 8) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must be at least 8 characters.",
    }));
  } else if (!/[A-Z]/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one uppercase letter.",
    }));
  } else if (!/[a-z]/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one lowercase letter.",
    }));
  } else if (!/\d/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one number.",
    }));
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one special character.",
    }));
  }
  return hasError;
};

export const handleLoginValidation = (formData, setErrors) => {
  let hasError = false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!formData.email?.trim()) {
    hasError = true;
    setErrors((prev) => ({ ...prev, email: "Enter an email address" }));
  } else if (!emailRegex.test(formData.email)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      email: "Enter a valid email address",
    }));
  }

  // Password validation
  const password = formData.password || "";
  if (password.length < 8) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must be at least 8 characters.",
    }));
  } else if (!/[A-Z]/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one uppercase letter.",
    }));
  } else if (!/[a-z]/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one lowercase letter.",
    }));
  } else if (!/\d/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one number.",
    }));
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      password: "Password must include at least one special character.",
    }));
  }
  return hasError;
};

export const handleAdminSubmit = (formData, setErrors) => {
  let hasError = false;
  if (formData.name === "") {
    hasError = true;
    setErrors((prevState) => ({ ...prevState, name: "Enter Product Name" }));
  } else if (formData.name?.trim()?.length < 3) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      name: "Product Name Should be 2 charater long",
    }));
  } else if (!/^[A-Za-z\s'-]+$/.test(formData.name.trim())) {
    hasError = true;
    setErrors((prev) => ({
      ...prev,
      name: "First can contain only letters, spaces, apostrophes or hyphens.",
    }));
  }

  if (formData.description === "") {
    hasError = true;
    setErrors((prevState) => ({
      ...prevState,
      description: "Enter Product description",
    }));
  }

  const Price = Number(formData.price);
  if (Price === 0) {
    hasError = true;
    setErrors((prev) => ({ ...prev, price: "Price Should not be 0" }));
  } else if (Price < 0) {
    hasError = true;
    setErrors((prev) => ({ ...prev, price: "Price Should not be Negative" }));
  }

  const Stock = Number(formData.stock);
  if (Stock === 0) {
    hasError = true;
    setErrors((prev) => ({ ...prev, stock: "Stock Should not be 0" }));
  } else if (Stock < 0) {
    hasError = true;
    setErrors((prev) => ({ ...prev, stock: "Stock Should not be Negative" }));
  }

  return hasError;
};
