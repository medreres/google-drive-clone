import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { addFolder, db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  function toggleModal() {
    setOpen((prevState) => !prevState);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder === null) return;

    // create a folder in the database
    addFolder({
      name,
      parentId: currentFolder,
      userId: currentUser.uid,
      path: "",
    });
    setName("");
    toggleModal();
  }

  return (
    <>
      <Button onClick={toggleModal} variant="outline-success">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={open} onHide={toggleModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Folder Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
