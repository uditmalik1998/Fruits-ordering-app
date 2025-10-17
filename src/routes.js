import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Login from "./components/LoginWrapper";
import Main from "./components/Main";
import Admin from "./components/Admin";

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Main />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/admin" element={<Admin />}></Route>
  </Route>
);

const router = createBrowserRouter(routes);
export default router;
