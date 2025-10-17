import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [cartCount, setCartCount] = useState(0);
  const [shake, setShake] = useState(false);
  const { data, setInput = () => {}, input = "" } = props;

  useEffect(() => {
    if (data.count !== cartCount) {
      setCartCount(data.count);

      // Trigger shake
      setShake(true);
    }
  }, [data.count]);

  const handleAnimation = () => {
    setShake(false);
  };

  return (
    <header className={styles.header_container}>
      <div className={styles.input_container}>
        <input
          className={styles.header_input}
          placeholder="search something"
          type="text"
          name="fruits search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <span className={styles.icon_conatiner}>
          <IoSearch className={styles.search_icon} />
        </span>
      </div>
      <div>
        <ul className={styles.header_links}>
          <Link className={`${styles.header_link} ${styles.link_none}`} to="/">
            <li>
              <strong className={`${styles.link}`}>Home</strong>
            </li>
          </Link>
          <Link
            className={`${styles.header_link} ${styles.link_none}`}
            to="/admin"
          >
            <li>
              <strong className={`${styles.link} ${styles.link_none}`}>
                Admin
              </strong>
            </li>
          </Link>
          <li
            className={`${styles.login_container} ${shake ? styles.shake : ""}`}
            onAnimationEnd={handleAnimation}
          >
            <FaCartShopping className={`${styles.cart_icon}`} />
            <span className={`${styles.cart_badge}`}>{cartCount}</span>
          </li>
          <Link className={styles.header_link} to="/login">
            <li className={`${styles.login_container}`}>
              <MdLogin className={`${styles.login_icon} ${styles.link}`} />
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
