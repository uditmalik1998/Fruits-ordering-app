import React, { useState } from "react";
import Card from "../Card";
import styles from "./index.module.css";
import jsonData from "./cardlist.json";

const CardList = (props) => {
  // const [items, setItems] = useState(jsonData);
  const { data = [], setData = () => {}, displayData = [] } = props;
  return (
    <div className={styles.cardlist_container}>
      {displayData?.length > 0 &&
        displayData.map((item,index) => (
          <Card key={item?._id} details={item} setItems={setData} items={data} index={index}/>
        ))}
    </div>
  );
};

export default CardList;
