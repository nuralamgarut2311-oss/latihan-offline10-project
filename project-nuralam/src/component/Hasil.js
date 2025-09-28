// src/components/Hasil.js
import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class Hasil extends Component {
  render() {
    const {
      keranjangs,
      tambahJumlah,
      kurangiJumlah,
      hapusKeranjang,
      checkout,
      menu,
      updateMenuStok,
    } = this.props;

    const totalBayar = keranjangs
      ? keranjangs.reduce((total, keranjang) => total + keranjang.total_harga, 0)
      : 0;

    return (
      <Col md={3}>
        <h5>
          <strong>Keranjang</strong>
        </h5>
        <hr />
        <ListGroup variant="flush">
          {keranjangs && keranjangs.length > 0 ? (
            keranjangs.map((keranjang) => {
              const menuItem = menu.find((m) => m.id === keranjang.product.id);
              const stokTersisa = menuItem ? menuItem.stock : 0;

              return (
                <ListGroupItem
                  key={keranjang.id}
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto w-100">
                    <div className="fw-bold">{keranjang.product.nama}</div>
                    <div>
                      Rp. {keranjang.product.harga.toLocaleString("id-ID")}
                    </div>

                    <div className="d-flex align-items-center mt-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          if (stokTersisa > 0) {
                            tambahJumlah(keranjang.id);
                            updateMenuStok(keranjang.product.id, stokTersisa - 1);
                          } else {
                            Swal.fire({
                              icon: "warning",
                              title: "Stok Habis",
                              text: `Produk "${keranjang.product.nama}" sudah habis!`,
                              timer: 1500,
                              showConfirmButton: false,
                            });
                          }
                        }}
                        disabled={stokTersisa <= 0}
                      >
                        +
                      </Button>

                      <span className="mx-2">{keranjang.jumlah}</span>

                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => {
                          kurangiJumlah(keranjang.id);
                          updateMenuStok(keranjang.product.id, stokTersisa + 1);
                        }}
                      >
                        -
                      </Button>

                      <Button
                        variant="danger"
                        size="sm"
                        className="ms-2"
                        onClick={() => {
                          hapusKeranjang(keranjang.id);
                          updateMenuStok(
                            keranjang.product.id,
                            stokTersisa + keranjang.jumlah
                          );
                        }}
                      >
                        x
                      </Button>
                    </div>
                  </div>
                </ListGroupItem>
              );
            })
          ) : (
            <div className="text-muted text-center">Belum ada produk</div>
          )}
        </ListGroup>

        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold">Total:</h6>
          <h6 className="fw-bold">Rp. {totalBayar.toLocaleString("id-ID")}</h6>
        </div>

        <div className="mt-2 text-end">
          {keranjangs.length > 0 && (
            <Button variant="success" onClick={checkout}>
              Bayar / Checkout
            </Button>
          )}
        </div>
      </Col>
    );
  }
}

export default withRouter(Hasil);
