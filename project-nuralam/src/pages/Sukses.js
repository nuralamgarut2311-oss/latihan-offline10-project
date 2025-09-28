// src/pages/Sukses.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import Navbar from "../component/Navbar";

export default function Sukses(props) {
  return (
    <>
      <Navbar />
      <Container className="mt-5 text-center">
        <h2>Terima kasih! 🎉</h2>
        <p>Pesanan berhasil dibuat dan stok sudah diperbarui.</p>
        <Button variant="primary" href="/">
          Kembali ke Home
        </Button>
      </Container>
    </>
  );
}
