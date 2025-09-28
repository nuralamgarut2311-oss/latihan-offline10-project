// src/pages/Navbar.js
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "../App.css";

function AppNavbar({ onLogout }) {
  const handleLogout = () => {
    // Kalau ada props dari App, jalankan
    if (onLogout) {
      onLogout();
    }
    // Default: hapus session dan redirect login
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">Transaksi App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/riwayat-transaksi">Riwayat Transaksi</Nav.Link>
            <Nav.Link href="/stockbarang">Stock Barang</Nav.Link>
          </Nav>

          {/* Tombol Logout di sisi kanan */}
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
