import "./App.css";
import { Login } from "./layout/pages/login";
import { Signup } from "./layout/pages/signup";
import { Header } from "./layout/Header";
import { Users } from "./layout/pages/user";
import { Form, Container, Row, Col } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer } from "./layout/Footer";

function App() {
  return (
    <Container className="bgColor" fluid>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
