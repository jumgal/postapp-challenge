import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

axios.defaults.baseURL = "http://localhost:5000";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const { name, email, password, password2 } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !password2) {
      setError("Please fill in all input fields");
      return;
    }

    if (password !== password2) {
      setError("Pasword does not match");
      return;
    }

    axios
      .post("api/users", formData)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
      })
      .catch((err) => {
        const { message } = err?.response?.data || {};
        setError(message);
      });

    setFormData({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  return (
    <Row className="d-flex justify-content-md-center mt-5">
      <Col md={8}>
        {error && (
          <h4 className="bg-danger text-white p-4 text-center m-3">{error}</h4>
        )}
        <h2 className="text-center">Sign up for a new account</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={password2}
              name="password2"
              onChange={handleInputChange}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
