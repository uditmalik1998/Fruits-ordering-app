import React from "react";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <span className={`${styles.dot_pulse}`} aria-hidden>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </span>
  );
};

export default Loader;
