import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import jsonData from "./components/CardList/cardlist.json";
import { Outlet } from "react-router-dom";

function App() {
  const [data, setData] = useState({ data: jsonData, count: 0 });
  const [displayData, setDisplayData] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    if (input === "") {
      setDisplayData(data?.data);
    }
    const res =
      data?.data?.length &&
      data?.data?.filter((item) => item?.name?.toLowerCase()?.includes(input?.toLowerCase()));
    setDisplayData(res);
  }, [input]);

  return (
    <div className="App">
      <Header data={data} setInput={setInput} input={input} />
      <Outlet />
      {/* {displayData?.length > 0 ? (
        <Main data={data} setData={setData} displayData={displayData} />
      ) : (
        <h1>Nothing to Show</h1>
      )} */}
    </div>
  );
}

export default App;
