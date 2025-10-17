import React, { useState } from "react";
import Login from "../Login";
import SignUp from "../SignUp";
import styles from "./index.module.css";
import {
  handleLoginValidation,
  handleSignUPValidation,
} from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const LoginWrapper = (props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    setErrors({ firstname: "", lastname: "", email: "", password: "" });

    const hasError = handleSignUPValidation(formData, setErrors);

    if (!hasError) {
      const data = await fetch(
        "https://fruitstore-1.onrender.com/api/AccountApi/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 👈 tells server we’re sending JSON
          },
          body: JSON.stringify(formData),
        }
      );
      const res = await data.json();
      if (res.message === "Registered!") {
        navigate("/");
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // Reset all errors first
    setErrors({ firstname: "", lastname: "", email: "", password: "" });

    const hasError = handleLoginValidation(formData, setErrors);

    if (!hasError) {
      console.log("All inputs are valid", formData);
      // Do your form submission logic here
      const res = await fetch(
        "https://fruitstore-1.onrender.com/api/AccountApi/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data?.message === "Logged in!") {
        navigate("/");
        console.log(data, "****");
      }
    }
  };

  return (
    <div className={styles.login_wrapper}>
      {isLogin ? (
        <Login
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitLogin}
          setIsLogin={setIsLogin}
          errors={errors}
        />
      ) : (
        <SignUp
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitSignUp}
          setIsLogin={setIsLogin}
          errors={errors}
        />
      )}
    </div>
  );
};
export default LoginWrapper;
