import React from "react";
import NavbarComponent from "./Navbar";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";

export default function Dashboard() {
  const { folder } = useFolder("roGOzsjXiLt37XO1Mj6A");
  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
      </Container>
    </>
  );
}
