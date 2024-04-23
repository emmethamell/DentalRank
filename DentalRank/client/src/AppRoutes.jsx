import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Rank from "./components/rank/Rank";
import Compare from "./components/compare/Compare";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Account from "./components/account/Account";
import React, { useEffect, useState } from "react"

export const AppRoutes = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
};
