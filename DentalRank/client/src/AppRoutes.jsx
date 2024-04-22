import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Rank from "./components/rank/Rank";
import Compare from "./components/compare/Compare";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};
