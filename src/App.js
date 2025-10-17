import "./App.css";
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import jsonData from "./components/CardList/cardlist.json";
import { Outlet } from "react-router-dom";

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState({ data: [], count: 0 });
  const [displayData, setDisplayData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handelApi = async () => {
      const res = await fetch("https://fruitstore-mi21.onrender.com/", {
        method: "Get",
      });
      const data = await res.json();
      if (data?.length > 0) {
        setData({ data, count: 0 });
        setDisplayData(data);
        console.log(data);
      }
    };
    handelApi();
  }, []);
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

  return (
    <div className="App">
      <DataContext value={{ displayData, setData, data }}>
        <Header data={data} setInput={setInput} input={input} />
        <Outlet />
      </DataContext>
    </div>
  );
}

export default App;
