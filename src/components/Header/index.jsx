import React, { useEffect, useState } from "react";
import { MdLogin } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import styles from "./index.module.css";

const Header = (props) => {
  const [cartCount, setCartCount] = useState(0);
  const [shake, setShake] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({});
  const { data } = props;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
      <div className={styles.name_wrapper}>
        <GiFruitBowl className={styles.h_logo} />
        <span>DryDelight</span>
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
          {isLoggedIn ? (
            <Link className={styles.profile_link} to="/profile">
              <li>
                <FaUser className={`${styles.profile_icon} ${styles.link}`} />
              </li>
            </Link>
          ) : (
            <Link className={styles.header_link} to="/login">
              <li className={`${styles.login_container}`}>
                <MdLogin className={`${styles.login_icon} ${styles.link}`} />
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
