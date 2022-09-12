import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./components/pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserList from "./components/pages/userList/UserList";
import User from "./components/pages/user/User";
import NewUser from "./components/pages/newUser/NewUser";
import ProductsList from "./components/pages/productList/ProductsList";
import Product from "./components/pages/product/Product";
import NewProduct from "./components/pages/newProduct/NewProduct";
import Login from "./components/pages/login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  // const admin = JSON.parse(
  //   JSON.parse(localStorage.getItem("persist:root")).user
  // ).currentUser.isAdmin;
  // const user = useSelector((state) => state.user.currentUser);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !user && navigate("/login", { replace: true });
  // }, [user, navigate]);

  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes path="/">
          <Route index element={<Home />} />
          <Route path="users" element={<UserList />} />

          <Route path="users/:id" element={<User />} />
          <Route path="newuser" element={<NewUser />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="newproduct" element={<NewProduct />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
