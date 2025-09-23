// import React, { Component } from 'react';
// import { Col, ListGroup } from 'react-bootstrap';

// export default class ListCategory extends Component {
//   render() {
//     const { categoryYangDipilih, changeCategory } = this.props;
//     const categories = ["Makanan", "Minuman", "Cemilan"];  // Kategori statis

//     return (
//       <Col md={2} mt='2'>
//         <h5><strong>Daftar Kategori</strong></h5>
//         <hr />
//         <ListGroup>
//           {categories.map((category) => (
//             <ListGroup.Item
//               key={category}
//               action
//               active={category === categoryYangDipilih}
//               onClick={() => changeCategory(category)}
//               style={{ cursor: "pointer" }}
//             >
//               {category}
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Col>
//     );
//   }
// }

import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';

export default class ListCategory extends Component {
  render() {
    const { categoryYangDipilih, changeCategory } = this.props;
    const categories = ["Makanan", "Minuman", "Cemilan"];  // Kategori statis

    return (
      <Col md={2}>
        <h5><strong>Daftar Kategori</strong></h5>
        <hr />
        <ListGroup>
          {categories.map((category) => (
            <ListGroup.Item
              key={category}
              action
              active={category === categoryYangDipilih}
              onClick={() => changeCategory(category)}
              style={{ cursor: "pointer" }}
            >
              {category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
