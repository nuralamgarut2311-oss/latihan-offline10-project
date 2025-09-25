// src/pages/Transaksi.js
import React, { Component } from "react";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Transaksi extends Component {
  state = {
    pesanan: null,
    loading: true,
  };

  componentDidMount() {
    const lastPesananId = localStorage.getItem("lastPesananId");

    if (lastPesananId) {
      axios
        .get(`${API_URL}/pesanan/${lastPesananId}`)
        .then((res) => {
          this.setState({ pesanan: res.data, loading: false });
          // Optional: clear the lastPesananId so next visit won't fetch same data
          // localStorage.removeItem("lastPesananId");
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { pesanan, loading } = this.state;

    if (loading) {
      return (
        <Container className="mt-5 text-center">
          <h4>Memuat pesanan...</h4>
        </Container>
      );
    }

    if (!pesanan) {
      return (
        <Container className="mt-5 text-center">
          <h4>Belum ada transaksi</h4>
          <Button href="/">Kembali</Button>
        </Container>
      );
    }

    return (
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="shadow">
              <Card.Body>
                <h3 className="text-center mb-3">Transaksi Berhasil 🎉</h3>
                <p className="text-muted text-center">
                  Waktu: {new Date(pesanan.timestamp).toLocaleString("id-ID")}
                </p>
                <ListGroup variant="flush">
                  {pesanan.menus.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>{item.product.nama}</strong> <br />
                          Jumlah: {item.jumlah}
                        </div>
                        <div>
                          Rp {item.total_harga.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total Bayar:</span>
                      <span>
                        Rp {pesanan.total_bayar.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <div className="text-center mt-3">
                  <Button variant="success" href="/">
                    Kembali ke Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
