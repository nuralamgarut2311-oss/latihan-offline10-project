import React, { Component } from "react";
import {
  Container,
  ListGroup,
  Spinner,
  Badge,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Navbar from "../component/Navbar";

export default class CekStok extends Component {
  state = {
    produkList: [],
    loading: true,
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
    if (stokBaru < 0) return; // Mencegah stok negatif

    axios
      .patch(`${API_URL}/product/${productId}`, {
        stock: stokBaru,
      })
      .then(() => {
        this.fetchProduk(); // Refresh data setelah update
      })
      .catch((err) => {
        console.error("Gagal mengubah stok:", err);
      });
  };

  render() {
    const { produkList, loading } = this.state;

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
            <ListGroup>
              {produkList.map((product) => (
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
          )}
        </Container>
      </>
    );
  }
}
