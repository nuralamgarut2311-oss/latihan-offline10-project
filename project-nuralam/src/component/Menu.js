// src/pages/Menu.js
import React from "react";
import { Col, Card, Button, Badge } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import "../App.css";
import Swal from "sweetalert2";

const Menu = ({ menu, masukkanKeranjang }) => {
  const handleClick = (e) => {
    e.stopPropagation();

    if (menu.stock === 0 || menu.stock <= 0) {
      Swal.fire({
        icon: "error",
        title: "Stok Habis",
        text: `${menu.nama} tidak tersedia saat ini.`,
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: `${menu.nama} berhasil ditambahkan ke keranjang`,
      confirmButtonText: "OK",
    }).then(() => {
      masukkanKeranjang(menu);
    });
  };

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card className="shadow" style={{ cursor: "pointer" }} onClick={handleClick}>
        <Card.Img
          variant="top"
          src={"images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}
          style={{ height: 180, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>
            {menu.kode} - {menu.nama}{" "}
            {menu.stock > 0 ? (
              <Badge bg="success">Ready</Badge>
            ) : (
              <Badge bg="danger"></Badge>
            )}
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
          <Card.Text>
            <strong>Stok: </strong> {menu.stock ?? 0}
          </Card.Text>

          <Button
            variant={menu.stock > 0 ? "primary" : "secondary"}
            onClick={handleClick}
            disabled={menu.stock <= 0}
          >
            {menu.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menu;
