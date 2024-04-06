import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Rank from "./components/rank/Rank";
import Compare from "./components/compare/Compare";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>
  );
};
