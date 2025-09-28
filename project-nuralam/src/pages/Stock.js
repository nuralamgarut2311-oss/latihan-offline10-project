// src/pages/Stock.js
import React, { Component } from "react";
import { Container, ListGroup, Spinner, Badge, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Navbar from "../component/Navbar";
import Swal from "sweetalert2";

export default class CekStok extends Component {
  state = {
    produkList: [],
    loading: true,
    selectedCategory: "all", // kategori yang dipilih
  };

  componentDidMount() {
    this.fetchProduk();
  }

  fetchProduk = () => {
    axios
      .get(`${API_URL}/product`)
      .then((res) => {
        this.setState({ produkList: res.data, loading: false });
      })
      .catch((err) => {
        console.error("Gagal memuat data produk:", err);
        this.setState({ loading: false });
      });
  };

  updateStok = (productId, stokBaru) => {
    if (stokBaru < 0) return; // cegah negatif
    const newProdukList = this.state.produkList.map((p) =>
      p.id === productId ? { ...p, stock: stokBaru } : p
    );
    this.setState({ produkList: newProdukList });
  };

  submitStok = () => {
    const { produkList } = this.state;

    const updatePromises = produkList.map((product) =>
      axios.patch(`${API_URL}/product/${product.id}`, { stock: product.stock })
    );

    Promise.all(updatePromises)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Stok berhasil diperbarui!",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error("Gagal update stok:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memperbarui stok produk.",
        });
      });
  };

  handleCategoryChange = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  render() {
    const { produkList, loading, selectedCategory } = this.state;

    // filter produk sesuai kategori
    const filteredProduk =
      selectedCategory === "all"
        ? produkList
        : produkList.filter(
            (p) => p.category?.nama === selectedCategory
          );

    // ambil daftar kategori unik
    const kategoriList = [
      "all",
      ...new Set(produkList.map((p) => p.category?.nama).filter(Boolean)),
    ];

    return (
      <>
        <Navbar />
        <Container className="mt-4">
          <h3 className="mb-4">📦 Cek Stok Produk</h3>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" />
              <p>Memuat data produk...</p>
            </div>
          ) : (
            <>
              {/* Filter kategori */}
              <Form.Group className="mb-3" controlId="filterKategori">
                <Form.Label>Kategori</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={this.handleCategoryChange}
                >
                  {kategoriList.map((kategori) => (
                    <option key={kategori} value={kategori}>
                      {kategori === "all" ? "Semua" : kategori}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <ListGroup>
                {filteredProduk.map((product) => (
                  <ListGroup.Item key={product.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">{product.nama}</h5>
                        <div className="small text-muted">
                          Kategori: {product.category?.nama}
                        </div>
                        <div className="small text-muted">
                          Harga: Rp {product.harga.toLocaleString("id-ID")}
                        </div>
                      </div>
                      <div className="text-end">
                        <Badge
                          bg={product.stock > 0 ? "success" : "danger"}
                          className="mb-2"
                        >
                          Stok: {product.stock}
                        </Badge>
                        <div>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                              this.updateStok(product.id, product.stock + 1)
                            }
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              this.updateStok(product.id, product.stock - 1)
                            }
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="text-end mt-4">
                <Button variant="primary" onClick={this.submitStok}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </Container>
      </>
    );
  }
}
