import { Button, Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { uuidv4 } from "@firebase/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { db } from "../../firebase";

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

    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      if (currentFolder !== ROOT_FOLDER) {
        path.push({
          name: currentFolder.name,
          id: currentFolder.id,
        });
      }
    }

    // create a folder in the database
    db.addFolder({
      folderIdFB: uuidv4(),
      name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
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
