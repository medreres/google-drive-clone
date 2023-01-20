import React from "react";
import { Navbar as NavbarBootstrap, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavbarBootstrap bg="light" expand="sm">
      <NavbarBootstrap.Brand as={Link} to="/" className="ms-2">
        My Drive
      </NavbarBootstrap.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user">
          Profile
        </Nav.Link>
      </Nav>
    </NavbarBootstrap>
  );
}
