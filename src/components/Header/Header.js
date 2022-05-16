import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo"> Movie App </div>
      </Link>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
