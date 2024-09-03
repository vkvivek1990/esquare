import React, { useState } from "react";
import { Container, Row, Col, Form, Toast } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loginAction = () => {
    const formData = {
      username: userName,
      password: passWord,
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
        userId: 12345,
      },
      body: JSON.stringify(formData),
    }).then((res) =>
      res.json().then((data) => {
        if (data.status) {
          setShow(true);
          setMsg(data.msg);
          navigate("/users");
        } else {
          setShow(true);
          setMsg(data.msg);
        }

        //alert(JSON.stringify(data));
      })
    );
  };
  return (
    <Container className="loginContainer">
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={userName}
            placeholder="Username"
            required={true}
          />
          <br />
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={passWord}
            placeholder="Password"
            required={true}
          />
          <br />
          <Form.Control
            type="button"
            onClick={() => loginAction()}
            value="Login"
          />
        </Col>
      </Row>
      <Toast
        position="bottom-end"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </Container>
  );
};
