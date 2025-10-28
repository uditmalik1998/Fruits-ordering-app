import React, { useRef, useState, useEffect, use } from "react";
import styles from "./index.module.css";
import { CartContext } from "../../App";
import Loader from "../Loader";

const Card = (props) => {
  const [expand, setExpand] = useState(false);
  const [isOverFlowing, setIsOverFlowing] = useState(false);
  const descriptionRef = useRef(null);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const { setCartData, cartData } = use(CartContext);
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

  const handleClick = async () => {
    setIsApiLoading(true);
    setItems((prevItems) => {
      let found = false;
      const updatedItems = prevItems.data.map((item) => {
        if (item._id === details._id) {
          found = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      // If item was found, return updated array; otherwise, add new item
      return found
        ? { data: updatedItems, count: items.count + 1 }
        : { ...prevItems };
    });

    // setCartData((prev) => {
    //   const existingItem = prev.find((item) => item._id === details._id);
    //   if (existingItem) {
    //     return prev.map((item) =>
    //       item._id === details._id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );
    //   }
    //   return [...prev, { ...details, quantity: 1 }];
    // });

    try {
      const token = localStorage.getItem("token");
      const payload = {
        item_name: details.item_name,
        price: details.price,
        img_url: details.img_url,
        quantity: 1,
        _id: details._id,
      };

      const data = await fetch("http://localhost:3001/api/v1/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await data.json();
      setCartData(json.data);
      setIsApiLoading(false);
    } catch (err) {
      console.log(err, "Error");
      setIsApiLoading(false);
    }
  };

  const handleDecrement = () => {
    if (items?.data?.[index].quantity > 0) {
      const updatedData =
        items?.data?.length > 0 &&
        items.data.map((item) => {
          if (item?._id === details?._id) {
            return { ...item, quantity: item.quantity - 1 };
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
          src={`${details?.img_url}`}
          alt={details?.item_name}
        />
      </div>
      <div>
        <p className={styles.card_name}>
          <strong>{details?.item_name}</strong>
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
          {isApiLoading ? <Loader /> : "+1"}
        </button>
        <button
          className={`${styles.card_btn} ${styles.card_btn_p}`}
          onClick={handleDecrement}
        >
          -1
        </button>
      </div>
    </div>
  );
};

export default Card;
