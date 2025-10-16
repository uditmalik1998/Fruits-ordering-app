import React from "react";
import CardList from "../CardList";
import styles from "./index.module.css";

const Main = (props) => {
  const {data = [], setData = () => {}, displayData = []} = props
  return (
    <div className={styles.main_container}>
      <CardList data={data} setData={setData} displayData={displayData}/>
    </div>
  );
};

export default Main;
