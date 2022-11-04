import {Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { useSelector } from 'react-redux';

const AppRoutes = () => {
  const isLogged = useSelector(state => state.user.state);
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={isLogged ? <NotFound /> : <div>Please log in!</div>} />
    </Routes>
  );
};

export default AppRoutes;