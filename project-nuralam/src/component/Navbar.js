import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../App.css";

// Data produk (sebagai contoh bisa kamu ambil dari state / props)
const products = [
  { id: "1", nama: "Sate Ayam", rating: 9.9, category: { id: "1", nama: "Makanan" } },
  { id: "2", nama: "Nasi Goreng", rating: 8.5, category: { id: "1", nama: "Makanan" } },
  { id: "3", nama: "Es Jeruk", rating: 8.7, category: { id: "2", nama: "Minuman" } },
  { id: "4", nama: "Coffe Late", rating: 9.2, category: { id: "2", nama: "Minuman" } },
  { id: "5", nama: "Kentang Goreng", rating: 7.8, category: { id: "3", nama: "Cemilan" } },
  { id: "6", nama: "Burger", rating: 8.1, category: { id: "3", nama: "Cemilan" } },
];

// Fungsi hitung rata-rata rating per kategori
function avgRatingByCategory(products, categoryId) {
  const filtered = products.filter(p => p.category.id === categoryId);
  if (filtered.length === 0) return 0;
  const sum = filtered.reduce((acc, p) => acc + p.rating, 0);
  return (sum / filtered.length).toFixed(1);
}

function AppNavbar() {
  const makananRating = avgRatingByCategory(products, "1");
  const minumanRating = avgRatingByCategory(products, "2");
  const cemilanRating = avgRatingByCategory(products, "3");

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
            <NavDropdown title="Rating Kategori Product" id="basic-nav-dropdown">
              <NavDropdown.Item disabled><strong>Rating Rata-rata</strong></NavDropdown.Item>
              <NavDropdown.Item>
                Makanan: {makananRating} ⭐
              </NavDropdown.Item>
              <NavDropdown.Item>
                Minuman: {minumanRating} ⭐
              </NavDropdown.Item>
              <NavDropdown.Item>
                Cemilan: {cemilanRating} ⭐
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
