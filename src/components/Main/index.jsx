import React, { useContext } from "react";
import CardList from "../CardList";
import styles from "./index.module.css";
import { DataContext } from "../../App";

const Main = (props) => {
  const { displayData, data, setData } = useContext(DataContext);
  return (
    <div className={styles.main_container}>
      <CardList data={data} setData={setData} displayData={displayData} />
    </div>
  );
};

export default Main;
