// src/pages/Sukses.js
import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";

export default class Sukses extends Component {
  componentDidMount() {
    // Ambil semua keranjang dulu
    axios
      .get(API_URL + "/keranjangs")
      .then((res) => {
        const keranjangs = res.data;

        if (keranjangs.length > 0) {
          // Buat pesanan baru dengan timestamp
          const timestamp = new Date().toISOString();
          const pesanan = {
            total_bayar: keranjangs.reduce(
              (sum, k) => sum + k.total_harga,
              0
            ),
            menus: keranjangs,
            timestamp: timestamp,
          };

          // ✅ Simpan ke db pesanan[]
          axios
            .post(API_URL + "/pesanan", pesanan)
            .then(() => {
              // ✅ Tampilkan Swal sukses sekali saja
              Swal.fire({
                icon: "success",
                title: "Sukses!",
                text: "Pesanan berhasil dicatat.",
                confirmButtonText: "Kembali",
              }).then(() => {
                // redirect ke Home setelah klik OK
                this.props.history.push("/");
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return null; // tidak perlu render apapun, Swal yang tampil
  }
}