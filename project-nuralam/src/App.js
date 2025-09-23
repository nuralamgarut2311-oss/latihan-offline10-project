// import React, { Component } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import { ListCategory, Menu, AppNavbar, Hasil } from "./component/indek";
// import { API_URL } from "./utils/constants";
// import axios from "axios";

// export default class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       menu: [],
//       categoryYangDipilih: "Makanan",  // default kategori
//     };
//   }

//   componentDidMount() {
//     axios.get(API_URL + "/product").then((res) => {
//       const menu = res.data;
//       this.setState({ menu });
//     });
//   }

//   changeCategory = (category) => {
//     this.setState({
//       categoryYangDipilih: category,
//     });
//   };

//   render() {
//     const { menu, categoryYangDipilih } = this.state;

//     // Filter menu sesuai kategori yang dipilih
//     const filteredMenu = menu.filter(
//       (item) => item.category.nama.toLowerCase() === categoryYangDipilih.toLowerCase()
//     );

//     return (
//       <div className="App">
//         <AppNavbar />
//         <div className="mt-3">
//           <Container fluid>
//             <Row>
//               <ListCategory
//                 categoryYangDipilih={categoryYangDipilih}
//                 changeCategory={this.changeCategory}
//               />
//               <Col>
//                 <h5><strong>Daftar Product</strong></h5>
//                 <hr />
//                 <Row>
//                   {filteredMenu.length > 0 ? (
//                     filteredMenu.map((menu) => (
//                       <Menu key={menu.id} menu={menu} />
//                     ))
//                   ) : (
//                     <p>Produk tidak tersedia untuk kategori ini.</p>
//                   )}
//                 </Row>
//               </Col>
//               <Hasil />
//             </Row>
//           </Container>
//         </div>
//       </div>
//     );
//   }
// }


import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListCategory, Menu, Navbar, Hasil } from "./component/indek";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
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
      const menu = res.data;
      this.setState({ menu });
    });
  };

  changeCategory = (category) => {
    this.setState({
      categoryYangDipilih: category,
    });
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
      this.setState({ keranjangs: newKeranjangs });
    } else {
      const newItem = {
        id: new Date().getTime(),
        product,
        jumlah: 1,
        total_harga: product.harga,
      };
      this.setState({ keranjangs: [...keranjangs, newItem] });
    }
  };

resetKeranjang = () => {
  this.setState({ keranjangs: [] });
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
                <h5><strong>Daftar Product</strong></h5>
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
              <Hasil keranjangs={keranjangs} resetKeranjang={this.resetKeranjang} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
