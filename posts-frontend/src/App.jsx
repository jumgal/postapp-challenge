import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import SignUp from "./pages/SignUp";
import NavbarComponent from "./components/Navbar";


function App() {
  return (
    <Router>
      <Container>
        <Row className="d-flex justify-content-md-center bg-color-purple">
          <Col md={9}>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signout" element={<SignOut />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
