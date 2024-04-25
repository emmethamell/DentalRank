import React from "react";
import "./footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; Emmet Hamell{" " + new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
