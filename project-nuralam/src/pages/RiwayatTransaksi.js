// src/pages/RiwayatTransaksi.js
import React, { Component } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Navbar from "../component/Navbar";
import "./RiwayatTransaksi.css"; // ✅ Tambahkan file CSS jika ingin styling cetak

export default class RiwayatTransaksi extends Component {
  state = {
    pesananList: [],
    loading: true,
    selectedPesanan: null,
  };

  componentDidMount() {
    this.fetchPesanan();
  }

  fetchPesanan = () => {
    axios
      .get(`${API_URL}/pesanan`)
      .then((res) => {
        const sortedPesanan = res.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        this.setState({ pesananList: sortedPesanan, loading: false });
      })
      .catch((err) => {
        console.error("Gagal memuat riwayat transaksi:", err);
        this.setState({ loading: false });
      });
  };

  pilihPesanan = (pesanan) => {
    this.setState({ selectedPesanan: pesanan });
  };

  kembaliKeList = () => {
    this.setState({ selectedPesanan: null });
  };

  cetakTransaksi = () => {
    window.print();
  };

  render() {
    const { pesananList, loading, selectedPesanan } = this.state;

    return (
      <>
        <Navbar />
        <Container className="mt-4">
          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
              <p>Memuat riwayat transaksi...</p>
            </div>
          ) : selectedPesanan ? (
            <>
              <Button
                variant="secondary"
                onClick={this.kembaliKeList}
                className="mb-3 me-2"
              >
                &larr; Kembali ke Daftar
              </Button>

              {/* ✅ Tombol Cetak */}
              <Button
                variant="primary"
                onClick={this.cetakTransaksi}
                className="mb-3"
              >
                🖨️ Cetak Transaksi
              </Button>

              {/* ✅ Area yang ingin dicetak */}
              <div className="printable-area">
                <Card>
                  <Card.Body>
                    <h4 className="mb-3 text-center">Detail Transaksi</h4>
                    <p>
                      <strong>Waktu:</strong>{" "}
                      {new Date(selectedPesanan.timestamp).toLocaleString("id-ID")}
                    </p>
                    <ListGroup variant="flush">
                      {(selectedPesanan.menus || []).map((item, index) => (
                        <ListGroup.Item key={index}>
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>{item?.product?.nama}</strong> <br />
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
                            Rp {selectedPesanan.total_bayar.toLocaleString("id-ID")}
                          </span>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </div>
            </>
          ) : (
            <>
              <h3 className="mb-4">Riwayat Transaksi</h3>
              {pesananList.length === 0 ? (
                <p className="text-muted">Belum ada riwayat transaksi.</p>
              ) : (
                <ListGroup>
                  {pesananList.map((pesanan) => (
                    <ListGroup.Item
                      key={pesanan.id}
                      action
                      onClick={() => this.pilihPesanan(pesanan)}
                    >
                      <div className="d-flex justify-content-between">
                        <div>
                          <strong>Waktu:</strong>{" "}
                          {new Date(pesanan.timestamp).toLocaleString("id-ID")}
                        </div>
                        <div>
                          <strong>Total:</strong>{" "}
                          Rp {pesanan.total_bayar.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </>
          )}
        </Container>
      </>
    );
  }
}
