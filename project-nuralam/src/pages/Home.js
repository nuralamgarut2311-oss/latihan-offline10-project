import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategory, Menu, Navbar, Hasil } from "../component/indek";
import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
      categoryYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios.get(API_URL + "/product").then((res) => {
      this.setState({ menu: res.data });
    });
  };

  changeCategory = (category) => {
    this.setState({ categoryYangDipilih: category });
  };

  masukkanKeranjang = (product) => {
    const { keranjangs } = this.state;

    const keranjangIndex = keranjangs.findIndex(
      (item) => item.product.id === product.id
    );

    if (keranjangIndex !== -1) {
      const newKeranjangs = [...keranjangs];
      newKeranjangs[keranjangIndex].jumlah += 1;
      newKeranjangs[keranjangIndex].total_harga += product.harga;
      this.setState({ keranjangs: newKeranjangs }, () => {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Pesanan masuk keranjang",
          confirmButtonText: "OK",
        });
      });
    } else {
      const newItem = {
        id: new Date().getTime(),
        product,
        jumlah: 1,
        total_harga: product.harga,
      };
      this.setState({ keranjangs: [...keranjangs, newItem] }, () => {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Pesanan masuk keranjang",
          confirmButtonText: "OK",
        });
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

  // src/pages/Home.js (hanya bagian checkout yang diubah)

checkout = () => {
  const { keranjangs } = this.state;
  if (keranjangs.length === 0) return;

  const timestamp = new Date().toISOString();
  const total_bayar = keranjangs.reduce(
    (sum, item) => sum + item.total_harga,
    0
  );

  const pesananBaru = {
    menus: keranjangs,
    total_bayar,
    timestamp,
  };

  axios
    .post(API_URL + "/pesanan", pesananBaru)
    .then((res) => {
      // Simpan id pesanan terbaru di localStorage
      localStorage.setItem("lastPesananId", res.data.id);

      // Bersihkan keranjang
      this.resetKeranjang();

      // Redirect ke halaman transaksi
      this.props.history.push("/transaksi");
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Gagal Checkout",
        text: "Terjadi kesalahan saat checkout. Silakan coba lagi.",
      });
    });
  // Simpan ke endpoint /pesanan
  axios
    .post(`${API_URL}/pesanan`, pesananBaru)
    .then(() => {
      // Kosongkan keranjang di state
      this.setState({ keranjangs: [] });

      // Redirect ke halaman transaksi
      this.props.history.push("/transaksi");
    })
    .catch((err) => {
      console.error("Gagal menyimpan pesanan:", err);
    });
};


  render() {
    const { menu, categoryYangDipilih, keranjangs } = this.state;

    const filteredMenu = menu.filter(
      (item) =>
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
                  {filteredMenu.length > 0 ? (
                    filteredMenu.map((menu) => (
                      <Menu
                        key={menu.id}
                        menu={menu}
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
                resetKeranjang={this.resetKeranjang}
                tambahJumlah={this.tambahJumlah}
                kurangiJumlah={this.kurangiJumlah}
                hapusKeranjang={this.hapusKeranjang}
                checkout={this.checkout}
              />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}