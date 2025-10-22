import React from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import styles from "./index.module.css";

const Profile = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const password = watch("password");
  return (
    <div className={styles.profile_container}>
      <form className={styles.profile_form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.user_icon_wrapper}>
          <FaUser className={styles.user_icon} />
        </div>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor="firstname">
            FirstName:
          </label>
          <input
            className={styles.ipt}
            type="text"
            id="firstname"
            name="firstname"
            {...register("firstname", {
              required: { value: true, message: "Please Enter First Name" },
              minLength: {
                value: 2,
                message: "First Name Should be atleast 2 charater long..",
              },
            })}
          />
          {errors.firstname && (
            <span className={styles.error}>{errors.firstname.message}</span>
          )}
        </div>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor="lastname">
            LastName:
          </label>
          <input
            className={styles.ipt}
            type="text"
            id="lastname"
            name="lastname"
            {...register("lastname", {
              required: { value: true, message: "Please Enter LastName" },
              minLength: {
                value: 2,
                message: "LastName Should be atleast 2 charater long..",
              },
            })}
          />
          {errors.lastname && (
            <span className={styles.error}>{errors.lastname.message}</span>
          )}
        </div>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.ipt}
            type="email"
            id="email"
            name="email"
            {...register("email", {
              required: { value: true, message: "Please Enter Email" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please Enter a valid Email..",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.ipt}
            type="password"
            id="password"
            name="password"
            {...register("password", {
              required: { value: true, message: "Please Enter Password" },
              minLength: {
                value: 8,
                message: "Password atleast 8 charater long...",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>
        <div className={styles.label_container}>
          <label className={styles.label} htmlFor="confirmpassword">
            Confirm Password:
          </label>
          <input
            className={styles.ipt}
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            {...register("confirmpassword", {
              required: { value: true, message: "Please Enter Password" },
              minLength: {
                value: 8,
                message: "Password atleast 8 charater long...",
              },
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmpassword && (
            <span className={styles.error}>
              {errors.confirmpassword.message}
            </span>
          )}
        </div>
        <button className={styles.profile_edit_btn} type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default Profile;
