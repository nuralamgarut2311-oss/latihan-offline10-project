import React from "react";
import { Col, Card, CardTitle } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import "../App.css";
import Swal from "sweetalert2";

const Menu = ({ menu, masukkanKeranjang }) => {
  const handleClick = () => {
    Swal.fire({
      icon: "success",
      title: "Sukses",
      text: `${menu.nama} berhasil ditambahkan ke keranjang`,
      confirmButtonText: "OK"
    }).then(() => {
      masukkanKeranjang(menu);
    });
  };

  return (
    <Col md={4} xs={6} className="mb-4">
      <Card 
        className="shadow" 
        onClick={handleClick} 
        style={{ cursor: "pointer" }}
      >
        <Card.Img
          variant="top"
          src={"images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}
        />
        <Card.Body>
          <CardTitle>
            {menu.kode} - {menu.nama}
          </CardTitle>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menu;
