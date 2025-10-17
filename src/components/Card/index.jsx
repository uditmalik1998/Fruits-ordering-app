import React, { useRef, useState, useEffect } from "react";
import styles from "./index.module.css";

const Card = (props) => {
  const [expand, setExpand] = useState(false);
  const [isOverFlowing, setIsOverFlowing] = useState(false);
  const descriptionRef = useRef(null);
  const { items = {}, setItems = () => {}, details = {}, index = 0 } = props;

  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setIsOverFlowing(el.scrollHeight > el.clientHeight); // el.scrollHeight is all height of p and el.client height is 2 lines height
    }
  }, [details.description]);

  const toggleDescription = () => {
    setExpand(!expand);
  };

  const handleClick = () => {
    setItems((prevItems) => {
      let found = false;
      const updatedItems = prevItems.data.map((item) => {
        if (item.id === details?.id) {
          found = true;
          return { ...item, stock: item.stock + 1 };
        }
        return item;
      });

      // If item was found, return updated array; otherwise, add new item
      return found
        ? { data: updatedItems, count: items.count + 1 }
        : [...prevItems];
    });
  };

  const handleDecrement = () => {
    if (items?.data?.[index].stock > 0) {
      const updatedData =
        items?.data?.length > 0 &&
        items.data.map((item) => {
          if (item?.id === details?.id) {
            return { ...item, stock: item.stock - 1 };
          }
          return item;
        });
      setItems({ data: updatedData, count: items.count - 1 });
    }
  };

  return (
    <div className={styles.card_conatiner}>
      <div>
        <img
          className={styles.card_img}
          src={`https://fruitstore-1.onrender.com/${details?.imagePath}`}
          alt={details?.name}
        />
      </div>
      <div>
        <p className={styles.card_name}>
          <strong>{details?.name}</strong>
        </p>
        <p
          ref={descriptionRef}
          className={`${styles.description} ${expand ? styles.expanded : ""}`}
        >
          {details?.description}
        </p>
        {isOverFlowing && (
          <span
            role="click"
            onClick={toggleDescription}
            className={styles.see_more}
          >
            {expand ? "see less" : "see more"}
          </span>
        )}
        <p className={styles.price}>{details.price}</p>
        <button className={styles.card_btn} onClick={handleClick}>
          {items?.data?.[index]?.stock === 0
            ? "+1"
            : `${items?.data?.[index]?.stock}`}
        </button>
        <button
          className={`${styles.card_btn} ${styles.card_btn_p}`}
          onClick={handleDecrement}
        >
          {details.stock >= 0 ? "-1" : `${details.stock}`}
        </button>
      </div>
    </div>
  );
};

export default Card;
