import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import styles from "./ContextMenu.module.css";

export default function ContextMenu({
  show,
  x,
  y,
  url,
  path,
  urlRef,
  id,
  file,
  ...props
}) {
  const [showModal, setShowModal] = useState(false);
  function copyToClipboard(path) {
    navigator.clipboard.writeText(path);
  }

  const toggleModal = () => setShowModal((prevState) => !prevState);

  const submitHandler = e => {
    // prevent form submitting form
    e.preventDefault();

    // send requset for deleting
    db.deleteFile(path, id);
  }

  return (
    <>
      <div
        className={`${styles.wrapper} ${show ? styles.visible : styles.hidden}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        {...props}
      >
        <div className={`${styles.content}`}>
          <ul className={`${styles.menu}`}>
            <li className={`${styles.item}`}>
              {file && (
                <a
                  className="w-100"
                  target="_blank"
                  href={url}
                  rel="noreferrer"
                >
                  <i className={`uil uil-eye`}></i>
                  <span>Preview</span>
                </a>
              )}
              {!file && (
                <Link
                  className="w-100"
                  target={"_blank"}
                  to={url}
                  onClick={(e) => {
                    console.log("clicked");
                  }}
                >
                  <i className={`uil uil-eye`}></i>
                  <span>Preview</span>
                </Link>
              )}
            </li>
            <li
              className={`${styles.item}`}
              onClick={() => copyToClipboard(url)}
            >
              <i className={`uil uil-link-alt`}></i>
              <span>Get Link</span>
            </li>
            <li className={`${styles.item}`}>
              <i className={`uil uil-edit`}></i>
              <span>Rename</span>
            </li>
            <li className={`${styles.item} text-danger`} onClick={toggleModal}>
              <i className={`uil uil-trash-alt`}></i>
              <span>Delete</span>
            </li>
          </ul>
        </div>
      </div>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header>Delete File</Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body className="text-center">
            Are you sure you want to delete this file?
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="outline-danger" onClick={toggleModal}>
              Delete
            </Button>
            <Button variant="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
