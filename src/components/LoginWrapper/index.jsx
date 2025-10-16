import React, { useState } from "react";
import Login from "../Login";
import SignUp from "../SignUp";
import styles from "./index.module.css";

const LoginWrapper = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className={styles.login_wrapper}>
      {isLogin ? (
        <Login
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          setIsLogin={setIsLogin}
        />
      ) : (
        <SignUp
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
};

export default LoginWrapper;
