import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  function toggleModal() {
    setOpen((prevState) => !prevState);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // create a folder in the database
    
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
            <Button variant="success">Create</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
