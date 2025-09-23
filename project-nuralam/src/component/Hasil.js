// import React, { Component } from 'react';
// import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';

// export default class Hasil extends Component {
//   render() {
//     const { keranjangs } = this.props;
//     const totalBayar = keranjangs
//       ? keranjangs.reduce((total, keranjang) => total + keranjang.total_harga, 0)
//       : 0;

//     return (
//       <Col md={3} mt="2">
//         <h5>
//           <strong>Hasil</strong>
//         </h5>
//         <hr />
//         <ListGroup variant="flush">
//           {keranjangs &&
//             keranjangs.map((keranjang) => (
//               <ListGroupItem
//                 key={keranjang.id}
//                 className="d-flex justify-content-between align-items-start"
//               >
//                 <div className="ms-2 me-auto">
//                   <div className="fw-bold">{keranjang.product.nama}</div>
//                   <div>
//                     Rp. {keranjang.product.harga.toLocaleString('id-ID')}
//                   </div>
//                 </div>
//                 <span>x {keranjang.jumlah}</span>
//               </ListGroupItem>
//             ))}
//         </ListGroup>
//         <hr />
//         <div className="d-flex justify-content-between align-items-center">
//           <h6 className="fw-bold">Total:</h6>
//           <h6 className="fw-bold">
//             Rp. {totalBayar.toLocaleString('id-ID')}
//           </h6>
//         </div>
//       </Col>
//     );
//   }
// }

// import React, { Component } from 'react';
// import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';

// export default class Hasil extends Component {
//   render() {
//     const { keranjangs } = this.props;
//     const totalBayar = keranjangs
//       ? keranjangs.reduce((total, keranjang) => total + keranjang.total_harga, 0)
//       : 0;

//     return (
//       <Col md={3}>
//         <h5>
//           <strong>Hasil</strong>
//         </h5>
//         <hr />
//         <ListGroup variant="flush">
//           {keranjangs &&
//             keranjangs.map((keranjang) => (
//               <ListGroupItem
//                 key={keranjang.id}
//                 className="d-flex justify-content-between align-items-start"
//               >
//                 <div className="ms-2 me-auto">
//                   <div className="fw-bold">{keranjang.product.nama}</div>
//                   <div>
//                     Rp. {keranjang.product.harga.toLocaleString('id-ID')}
//                   </div>
//                 </div>
//                 <span>x {keranjang.jumlah}</span>
//               </ListGroupItem>
//             ))}
//         </ListGroup>
//         <hr />
//         <div className="d-flex justify-content-between align-items-center">
//           <h6 className="fw-bold">Total:</h6>
//           <h6 className="fw-bold">
//             Rp. {totalBayar.toLocaleString('id-ID')}
//           </h6>
//         </div>
//       </Col>
//     );
//   }
// }

// src/component/Hasil.js

import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import ResetButton from './ResetButton'; // import tombol reset

export default class Hasil extends Component {
  render() {
    const { keranjangs, resetKeranjang } = this.props;

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
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{keranjang.product.nama}</div>
                  <div>
                    Rp. {keranjang.product.harga.toLocaleString('id-ID')}
                  </div>
                </div>
                <span>x {keranjang.jumlah}</span>
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

        {/* Tambahkan tombol reset */}
        <ResetButton resetKeranjang={resetKeranjang} />
      </Col>
    );
  }
}
