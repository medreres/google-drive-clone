import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordConfirmationRef = useRef();
  const passwordRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (
      passwordRef.current.value.length > 5 &&
      passwordConfirmationRef.current.value.length > 5
    ) {
      promises.push(updatePassword(emailRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={currentUser.email}
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
                placeholder="Leave blank to continue"
                type="password"
              />
            </Form.Group>
            <Form.Group id="password-confrim">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                autoComplete="on"
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Leave blank to continue"
              />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100 mt-3">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
  );
};

export default UpdateProfile;
