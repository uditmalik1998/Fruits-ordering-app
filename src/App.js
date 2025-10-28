import "./App.css";
import { useEffect, useState, createContext } from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import CartPopup from "./components/CartPopup";

export const DataContext = createContext(null);
export const CartContext = createContext(null);

function App() {
  const [data, setData] = useState({ data: [], count: 0 });
  const [show, setShow] = useState({ header: true });
  const [cartData, setCartData] = useState([]);
  const [isCartPopup, setIsCartPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setShow({ ...show, header: false });
    } else {
      setShow({ ...show, header: true });
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetch(
          "http://localhost:3001/api/v1/cart/getcartdetails",
          {
            method: "get",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await data.json();
        setCartData(json.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  const handleClose = () => {
    setIsCartPopup(false);
  };
  
  return (
    <div className="App">
      <DataContext value={{ setData, data }}>
        <CartContext value={{ setCartData, cartData }}>
          {show.header && (
            <Header cartData={cartData} setIsCartPopup={setIsCartPopup} />
          )}
          <Outlet />
          {isCartPopup && (
            <CartPopup
              isOpen={isCartPopup}
              onClose={handleClose}
              items={cartData.cart}
              onPlaceOrder={() => console.log(cartData)}
            />
          )}
        </CartContext>
      </DataContext>
    </div>
  );
}

export default App;
