import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import CenteredContainer from "../layout/CenteredContainer";

const Signup = () => {
  const emailRef = useRef();
  const passwordConfirmationRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to create and account");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoComplete="on"
                ref={emailRef}
                type="email"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                autoComplete="on"
                ref={passwordRef}
                type="password"
              />
            </Form.Group>
            <Form.Group id="password-confrim">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                autoComplete="on"
                ref={passwordConfirmationRef}
                type="password"
              />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </CenteredContainer>
  );
};

export default Signup;
