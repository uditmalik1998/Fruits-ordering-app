import React, { useContext, useState, useEffect } from "react";
import CardList from "../CardList";
import styles from "./index.module.css";
import { DataContext } from "../../App";
import jsonData from "../CardList/cardlist.json";
// import { IoSearch } from "react-icons/io5";

const Main = (props) => {
  const [input, setInput] = useState("");
  const { data, setData } = useContext(DataContext);
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (input === "") {
      setDisplayData(data?.data);
    }
    const res =
      data?.data?.length &&
      data?.data?.filter((item) =>
        item?.name?.toLowerCase()?.includes(input?.toLowerCase())
      );
    setDisplayData(res);
  }, [input]);

  useEffect(() => {
    const handelApi = async () => {
      try {
        const res = await fetch(
          "https://fruitstore-mi21.onrender.com/api/FruitApi",
          {
            method: "Get",
          }
        );
        if (!res.ok) {
          const errormsg = await res.json();
          return setError(
            errormsg.message || "Ah Oh Looks like something went wrong!"
          );
        }
        const data = await res.json();
        if (data?.length > 0) {
          console.log(data, "***");
          const updatedData =
            data?.length > 0 &&
            data.map((item) => {
              return { ...item, itemAdded: 0 };
            });
          setData({ data: updatedData, count: 0 });
          setDisplayData(updatedData);
          console.log(data);
        }
      } catch (err) {
        console.log(err, "***Error");
        setError(err.message || "Something went wrong");
      }
    };
    handelApi();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.input_container}>
        <input
          className={styles.header_input}
          placeholder="Search Product"
          type="text"
          name="fruits search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* <span className={styles.icon_conatiner}>
          <IoSearch className={styles.search_icon} />
        </span> */}
      </div>
      <CardList data={data} setData={setData} displayData={displayData} />
    </div>
  );
};

export default Main;
