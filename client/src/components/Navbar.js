import React from "react";

function Navbar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <h1>🔍 Lost & Found System</h1>
      </div>
      <div style={styles.navLinks}>
        <a href="/" style={styles.link}>
          Home
        </a>
        <a href="/report" style={styles.link}>
          Report Item
        </a>
        <a href="/login" style={styles.link}>
          Login
        </a>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#34495e",
  },
};

export default Navbar;