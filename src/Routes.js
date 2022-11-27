import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import ResetPasswordEmail from "./pages/ResetPasswordEmail";
import AddNewPassword from "./pages/AddNewPassword";
import RegisterForm from "./pages/RegisterForm";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const isLogged = useSelector(state => state.user.state);
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/reset-password-email" element={<ResetPasswordEmail />} />
        <Route path="/users/addNewPassword/:id/:token" element={<AddNewPassword />} />
        <Route path="/users/shopping-cart" element={<Cart />} />
        <Route path="*" element={isLogged ? <NotFound /> : <div>Please log in!</div>} />
    </Routes>
  );
};

export default AppRoutes;