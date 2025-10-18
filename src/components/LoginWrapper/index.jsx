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
    isAdmin: false,
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    apiError: "",
    loginAPiError: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const navigate = useNavigate();

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    setErrors({ firstname: "", lastname: "", email: "", password: "" });

    const hasError = handleSignUPValidation(formData, setErrors);

    if (!hasError) {
      try {
        setIsApiCall(true);
        const data = await fetch(
          "https://fruitstore-mi21.onrender.com/api/AccountApi/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // 👈 tells server we’re sending JSON
            },
            body: JSON.stringify(formData),
          }
        );
        if (!data.ok) {
          const errorData = await data.json();
          setIsApiCall(false);
          return setErrors((prevState) => ({
            ...prevState,
            apiError: errorData.message || `Error ${data.status}`,
          }));
        }
        const res = await data.json();
        if (res.message === "Registered!") {
          setIsApiCall(false);
          navigate("/");
        }
      } catch (err) {
        setIsApiCall(false);
        setErrors((prevState) => ({
          ...prevState,
          apiError:
            err.message || "Something went wrong. Please try again later.",
        }));
      }
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    // Reset all errors first
    setErrors({ firstname: "", lastname: "", email: "", password: "" });

    const hasError = handleLoginValidation(formData, setErrors);

    if (!hasError) {
      try {
        setIsApiCall(true);
        const res = await fetch(
          "https://fruitstore-mi21.onrender.com/api/AccountApi/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!res.ok) {
          const errorMsg = await res.json();
          setIsApiCall(false);
          return setErrors((prevState) => ({
            ...prevState,
            loginAPiError: errorMsg.message || `Error ${res.status}`,
          }));
        }
        const data = await res.json();
        if (data?.message === "Logged in!") {
          setIsApiCall(false);
          navigate("/");
        }
      } catch (err) {
        console.log(err, "***Error");
        setErrors((prevState) => ({
          ...prevState,
          loginAPiError:
            err.message || "Something went wrong. Please try again later.",
        }));
        setIsApiCall(false);
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
          isApiCall={isApiCall}
        />
      ) : (
        <SignUp
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmitSignUp}
          setIsLogin={setIsLogin}
          errors={errors}
          isApiCall={isApiCall}
        />
      )}
    </div>
  );
};
export default LoginWrapper;
