import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import ResetButton from './ResetButton'; // import tombol reset

export default class Hasil extends Component {
  render() {
    // ambil semua props dari App.js
    const { 
      keranjangs, 
      resetKeranjang, 
      tambahJumlah, 
      kurangiJumlah, 
      hapusKeranjang 
    } = this.props;

    const totalBayar = keranjangs
      ? keranjangs.reduce((total, keranjang) => total + keranjang.total_harga, 0)
      : 0;
    
    return (
      <Col md={3}>
        <h5>
          <strong>Hasil</strong>
        </h5>
        <hr />
        <ListGroup variant="flush">
          {keranjangs && keranjangs.length > 0 ? (
            keranjangs.map((keranjang) => (
              <ListGroupItem
                key={keranjang.id}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto w-100">
                  <div className="fw-bold">{keranjang.product.nama}</div>
                  <div>
                    Rp. {keranjang.product.harga.toLocaleString('id-ID')}
                  </div>

                  {/* tombol pindah ke bawah harga */}
                  <div className="d-flex align-items-center mt-2">
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => tambahJumlah(keranjang.id)}
                    >
                      +
                    </Button>
                    <span className="mx-2">{keranjang.jumlah}</span>
                    <Button 
                      variant="warning" 
                      size="sm" 
                      onClick={() => kurangiJumlah(keranjang.id)}
                    >
                      -
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="ms-2" 
                      onClick={() => hapusKeranjang(keranjang.id)}
                    >
                      x
                    </Button>
                  </div>
                </div>
              </ListGroupItem>
            ))
          ) : (
            <div className="text-muted text-center">Belum ada produk</div>
          )}
        </ListGroup>

        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold">Total:</h6>
          <h6 className="fw-bold">
            Rp. {totalBayar.toLocaleString('id-ID')}
          </h6>
        </div>

        {/* Tombol reset keranjang */}
        <ResetButton resetKeranjang={resetKeranjang} />
      </Col>
    );
  }
}
