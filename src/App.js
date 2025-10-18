import "./App.css";
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState({ data: [], count: 0 });
  const [show, setShow] = useState({ header: true });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setShow({ ...show, header: false });
    } else {
      setShow({ ...show, header: true });
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <DataContext value={{ setData, data }}>
        {show.header && <Header data={data} />}
        <Outlet />
      </DataContext>
    </div>
  );
}

export default App;
