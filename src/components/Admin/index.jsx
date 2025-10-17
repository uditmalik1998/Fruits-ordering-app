import React, { useState } from "react";
import styles from "./index.module.css";
import { handleAdminSubmit } from "../../utils/helper";

const Admin = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      name: "",
      description: "",
      price: "",
      stock: "",
      imagePath: "",
    });

    const hasError = handleAdminSubmit(formData, setErrors);
    if (!hasError) {
        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("price", formData.price);
        payload.append("stock", formData.stock);
        payload.append("imagePath", file);
        console.log(payload);

      const res = await fetch(
        "https://fruitstore-mi21.onrender.com/api/FruitApi",
        {
          method: "Post",
          body: payload,
        }
      );
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <div className={styles.admin_container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <label htmlFor="name" className={styles.form_label}>
          Item Name:
          <input
            className={styles.form_input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        {errors?.name && <span className={styles.err_msg}>{errors.name}</span>}
        <label htmlFor="description" className={styles.form_label}>
          Description
          <textarea
            className={styles.form_input}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>
        {errors?.description && (
          <span className={styles.err_msg}>{errors.description}</span>
        )}
        <label htmlFor="price" className={styles.form_label}>
          Price
          <input
            className={styles.form_input}
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
        </label>
        {errors?.price && (
          <span className={styles.err_msg}>{errors.price}</span>
        )}
        <label htmlFor="stock" className={styles.form_label}>
          Stock Availabel:
          <input
            className={styles.form_input}
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
          />
        </label>
        {errors?.stock && (
          <span className={styles.err_msg}>{errors.stock}</span>
        )}

        <label className={styles.form_label}>
          <input
            className={styles.form_input}
            type="file"
            accept=".jpg,image/jpeg"
            name="image"
            onChange={(e) => setFile(e.target?.files[0])}
          />
        </label>
        {errors?.imagePath && (
          <span className={styles.err_msg}>{errors.imagePath}</span>
        )}

        <button className={styles.form_btn} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Admin;
