import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import "./Header.css"; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); 
      navigate("/select-role");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TrendSetter</Link>
      </div>
      <nav className="nav-links">
        <Link className="nav-item" to="/home">Home</Link>
        <Link className="nav-item" to="/products">Products</Link>
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;