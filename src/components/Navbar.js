import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // ตรวจสอบว่าไฟล์นี้มีอยู่จริง

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/login" className="navbar-link">Login</Link> {/* ✅ ถูกต้องแล้ว */}
    </nav>
  );
}

export default Navbar;
