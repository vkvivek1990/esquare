import React, { useState } from "react";

import logo from "../../assets/logo.jpg";

import { Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="header">
        <Col className="logo">
          <img src={logo} />
        </Col>
        <Col xs={8} className="headerTitle">
          <h3>Welcome</h3>
        </Col>
        <Col>
          <span onClick={() => navigate("/login")}>Login</span>
        </Col>
      </Row>
    </>
  );
};
