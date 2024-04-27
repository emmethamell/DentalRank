import React from "react";
import "./footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; DentalRank{" " + new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
