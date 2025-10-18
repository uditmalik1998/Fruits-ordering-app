import React from "react";
import Loader from "../Loader/index";
import styles from "./index.module.css";

const Login = (props) => {
  const {
    formData = {},
    setFormData = () => {},
    handleSubmit = () => {},
    setIsLogin = () => {},
    errors = {},
    isApiCall = false,
  } = props;

  return (
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <label htmlFor="email" className={styles.form_label}>
        Email:
        <input
          className={styles.form_input}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </label>
      {errors?.email && <span className={styles.err_msg}>{errors.email}</span>}
      <label htmlFor="password" className={styles.form_label}>
        Password:
        <input
          className={styles.form_input}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </label>
      {errors?.password && (
        <span className={styles.err_msg}>{errors.password}</span>
      )}
      {errors?.loginAPiError && (
        <span className={styles.err_msg}>{errors.loginAPiError}</span>
      )}
      <button className={styles.form_btn} type="submit" disabled={isApiCall}>
        {isApiCall ? <Loader /> : "Login"}
      </button>
      <button onClick={() => setIsLogin(false)} className={styles.form_btn}>
        SignUp
      </button>
    </form>
  );
};

export default Login;
