import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import data from "./signUpMock.json";
import Fields from "../../../components/Fields";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [secondName, setSecondname] = useState("");
  const [age, setAge] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(fields.data);
    setFields(data.data);
  }, []);

  const signupAction = () => {
    const formData = {
      firstName: firstName,
      secondName: secondName,
      age: age,
      mail: mail,
      password: password,
      confirm_password: confirmPassword,
    };
    fetch("http://localhost:8080/signUp", {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.status === true) {
            alert(data.msg);
            navigate("/login");
          } else {
            alert("Technical Issue Try Again...");
          }
        })
      )
      .catch((err) => {
        alert(err);
      });
  };

  const onFieldChange = (e, data) => {
    console.log("field change", e, data);
  };
  return (
    <Container className="loginContainer">
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <br />
          {fields.length > 0 &&
            fields.map((fieldsData) => {
              return (
                <Fields
                  fieldProp={fieldsData}
                  onChange={(e, data) => {
                    onFieldChange(e, data);
                  }}
                />
              );
            })}
          {/* <Fields /> */}
          {/* <Form.Control
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstName}
            placeholder="First Name"
            required={true}
          />
          <br />
          <Form.Control
            type="text"
            onChange={(e) => setSecondname(e.target.value)}
            value={secondName}
            placeholder="Second Name"
            required={true}
          />
          <br />
          <Form.Control
            type="text"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            placeholder="Age"
            required={true}
          />
          <br />
          <Form.Control
            type="text"
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            placeholder="Mail Id"
            required={true}
          />
          <br />
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required={true}
          />
          <br />
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
            required={true}
          /> */}
          <br />
          <Form.Control
            type="button"
            onClick={() => signupAction()}
            value="Register"
          />
          <br />
        </Col>
      </Row>
    </Container>
  );
};
