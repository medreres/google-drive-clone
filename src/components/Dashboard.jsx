import { Alert } from "bootstrap";
import { updateCurrentUser } from "firebase/auth";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

const Dashboard = () => {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  async function logoutHandler() {
      setError('');
      try {
          await auth.logout();
          navigate('/login');
      } catch (error) {
          setError(error);
      }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
