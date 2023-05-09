import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Link} from 'react-router-dom'

const SignIn = () => {
  return (
    <Row className="d-flex justify-content-md-center mt-5">
      <Col md={8}>
        <h2 className="text-center">Sign into your account</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p className="mt-3">To signup, please <Link to="/signup">click here</Link></p>
      </Col>
    </Row>
  );
};

export default SignIn;
