// import './App.css';
import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategory, Menu, AppNavbar } from "./component/Index";
import { API_URL } from "./utils/constants";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: [],
    };
  }

  componentDidMount() {
    axios.get(API_URL + "/product").then((res) => {
      const menu = res.data;
      this.setState({ menu });
    });
  }

  render() {
    const { menu } = this.state;
    return (
      <div className="App">
        <AppNavbar />
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategory />
              <Col>
                <h5>
                  <strong>Daftar Product</strong>
                </h5>
                <hr />
                <Row>
                  {menu &&
                    menu.map((menu) => (
                      <Menu key={menu.id} menu={menu} />
                    ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
