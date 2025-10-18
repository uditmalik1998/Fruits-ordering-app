import React from "react";
import styles from "./index.module.css";
import Loader from "../Loader";

const SignUp = (props) => {
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
      <label htmlFor="name" className={styles.form_label}>
        First Name:
        <input
          className={styles.form_input}
          type="text"
          id="name"
          name="name"
          value={formData.firstname}
          onChange={(e) =>
            setFormData({ ...formData, firstname: e.target.value })
          }
        />
      </label>
      {errors?.firstname && (
        <span className={styles.err_msg}>{errors.firstname}</span>
      )}
      <label htmlFor="name" className={styles.form_label}>
        Last Name:
        <input
          className={styles.form_input}
          type="text"
          id="name"
          name="name"
          value={formData.lastname}
          onChange={(e) =>
            setFormData({ ...formData, lastname: e.target.value })
          }
        />
      </label>
      {errors?.lastname && (
        <span className={styles.err_msg}>{errors.lastname}</span>
      )}
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
      <label htmlFor="admin" className={styles.form_label}>
        Admin:
        <input
          // className={styles.form_input}
          type="checkbox"
          id="admin"
          name="admin"
          value={formData.isAdmin}
          onChange={(e) =>
            setFormData({ ...formData, isAdmin: e.target.checked })
          }
        />
      </label>
      {errors?.apiError && (
        <span className={styles.err_msg}>{errors.apiError}</span>
      )}
      <button className={styles.form_btn} type="submit" disabled={isApiCall}>
        {isApiCall ? <Loader /> : "SignUp"}
      </button>
      <button onClick={() => setIsLogin(true)} className={styles.form_btn}>
        Login
      </button>
    </form>
  );
};

export default SignUp;
