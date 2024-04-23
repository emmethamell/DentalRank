import "./account.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
    <div className="account-page">{JSON.stringify(user)}</div>
    <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default Account;
