// src/pages/Home.js
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategory, Menu, Navbar, Hasil } from "../component/indek";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  state = {
    menu: [],
    categoryYangDipilih: "Makanan",
    keranjangs: [],
    loading: true,
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios
      .get(`${API_URL}/product`)
      .then((res) => {
        this.setState({ menu: res.data, loading: false });
      })
      .catch((err) => {
        console.error("Gagal memuat produk:", err);
        this.setState({ loading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ categoryYangDipilih: category });
  };

  masukkanKeranjang = async (product) => {
    const { keranjangs } = this.state;
    const exist = keranjangs.find((k) => k.product.id === product.id);
    const inCartQty = exist ? exist.jumlah : 0;

    if (!product.stock || product.stock - inCartQty <= 0) {
      Swal.fire({
        icon: "error",
        title: "Stok Tidak Cukup",
        text: `${product.nama} stok tidak cukup untuk ditambahkan.`,
      });
      return;
    }

    try {
      const stokBaru = product.stock - 1;
      await axios.patch(`${API_URL}/product/${product.id}`, { stock: stokBaru });

      const updatedMenu = this.state.menu.map((m) =>
        m.id === product.id ? { ...m, stock: stokBaru } : m
      );
      this.setState({ menu: updatedMenu });

      if (exist) {
        const newKeranjangs = keranjangs.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                jumlah: item.jumlah + 1,
                total_harga: item.total_harga + product.harga,
              }
            : item
        );
        this.setState({ keranjangs: newKeranjangs });
      } else {
        const newItem = {
          id: new Date().getTime(),
          product: { ...product, stock: stokBaru },
          jumlah: 1,
          total_harga: product.harga,
        };
        this.setState({ keranjangs: [...keranjangs, newItem] });
      }

      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Pesanan masuk keranjang",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Gagal update stok:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mengurangi stok produk.",
      });
    }
  };

  resetKeranjang = () => {
    this.setState({ keranjangs: [] });
  };

  tambahJumlah = (id) => {
    const newKeranjangs = this.state.keranjangs.map((item) =>
      item.id === id
        ? {
            ...item,
            jumlah: item.jumlah + 1,
            total_harga: item.total_harga + item.product.harga,
          }
        : item
    );
    this.setState({ keranjangs: newKeranjangs });
  };

  kurangiJumlah = (id) => {
    const newKeranjangs = this.state.keranjangs
      .map((item) =>
        item.id === id
          ? {
              ...item,
              jumlah: item.jumlah - 1,
              total_harga: item.total_harga - item.product.harga,
            }
          : item
      )
      .filter((item) => item.jumlah > 0);
    this.setState({ keranjangs: newKeranjangs });
  };

  hapusKeranjang = (id) => {
    const newKeranjangs = this.state.keranjangs.filter((item) => item.id !== id);
    this.setState({ keranjangs: newKeranjangs });
  };

  updateMenuStok = (productId, stokBaru) => {
    const updatedMenu = this.state.menu.map((m) =>
      m.id === productId ? { ...m, stock: stokBaru } : m
    );
    this.setState({ menu: updatedMenu });
  };

  checkout = async () => {
    const { keranjangs, menu } = this.state;
    if (keranjangs.length === 0) return;

    try {
      const total_bayar = keranjangs.reduce((sum, item) => sum + item.total_harga, 0);
      const pesananBaru = {
        menus: keranjangs,
        total_bayar,
        timestamp: new Date().toISOString(),
      };

      const res = await axios.post(`${API_URL}/pesanan`, pesananBaru);
      if (res.data && res.data.id) localStorage.setItem("lastPesananId", res.data.id);

      // 🔄 Kurangi stok menu sesuai jumlah di keranjang
      const updatedMenu = menu.map((m) => {
        const keranjangItem = keranjangs.find((k) => k.product.id === m.id);
        if (keranjangItem) return { ...m, stock: m.stock - keranjangItem.jumlah };
        return m;
      });
      this.setState({ menu: updatedMenu });

      this.resetKeranjang();

      Swal.fire({
        icon: "success",
        title: "Checkout Berhasil",
        text: "Pesanan dicatat.",
      }).then(() => {
        this.props.history.push("/transaksi");
      });
    } catch (err) {
      console.error("Gagal checkout:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal Checkout",
        text: "Pesanan gagal disimpan.",
      });
    }
  };

  render() {
    const { menu, categoryYangDipilih, keranjangs, loading } = this.state;

    const filteredMenu = menu.filter(
      (item) =>
        item.category &&
        item.category.nama.toLowerCase() === categoryYangDipilih.toLowerCase()
    );

    return (
      <div className="App">
        <Navbar />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategory
                categoryYangDipilih={categoryYangDipilih}
                changeCategory={this.changeCategory}
              />
              <Col>
                <h5>
                  <strong>Daftar Produk</strong>
                </h5>
                <hr />
                <Row>
                  {loading ? (
                    <p>Memuat produk...</p>
                  ) : filteredMenu.length > 0 ? (
                    filteredMenu.map((menuItem) => (
                      <Menu
                        key={menuItem.id}
                        menu={menuItem}
                        masukkanKeranjang={this.masukkanKeranjang}
                      />
                    ))
                  ) : (
                    <p>Produk tidak tersedia untuk kategori ini.</p>
                  )}
                </Row>
              </Col>
              <Hasil
                keranjangs={keranjangs}
                menu={menu}
                tambahJumlah={this.tambahJumlah}
                kurangiJumlah={this.kurangiJumlah}
                hapusKeranjang={this.hapusKeranjang}
                checkout={this.checkout}
                updateMenuStok={this.updateMenuStok}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
