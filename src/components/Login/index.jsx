import React, { useState } from "react";
import styles from "./index.module.css";

const Login = (props) => {
  const {
    formData = {},
    setFormData = () => {},
    handleSubmit = () => {},
    setIsLogin = () => {},
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
      <button className={styles.form_btn} type="submit">
        Login
      </button>
      <button onClick={() => setIsLogin(false)} className={styles.form_btn}>
        SignUp
      </button>
    </form>
  );
};

export default Login;
