import React, { useContext, useState, useEffect, use } from "react";
import CardList from "../CardList";
import styles from "./index.module.css";
import { DataContext } from "../../App";
import jsonData from "../CardList/cardlist.json";
import HomeShimmer from "../HomeShimmer";
// import { IoSearch } from "react-icons/io5";

const Main = (props) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, setData } = useContext(DataContext);

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
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:3001/api/v1/admin/getAllItems",
          {
            method: "Get",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          const errormsg = await res.json();
          setIsLoading(false);
          return setError(
            errormsg.errormsg || "Ah Oh Looks like something went wrong!"
          );
        }
        const data = await res.json();
        if (data?.data?.length > 0) {
          const updatedData =
            data.data.length > 0 &&
            data.data.map((item) => {
              return { ...item, itemAdded: 0 };
            });

          setData({ data: updatedData, count: 0 });
          setDisplayData(updatedData);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err, "***Error");
        setError(err.message || "Something went wrong");
      }
    };
    handelApi();
  }, []);
  
  return (
    <>
      {isLoading ? (
        <HomeShimmer />
      ) : (
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
      )}
    </>
  );
};

export default Main;
