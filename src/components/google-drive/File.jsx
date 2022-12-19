import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "./ContextMenu";

export default function File({ file }) {
  const { showContextMenu, toggleContextmenu, isEditing, setIsEditing } =
    useContextMenu();
  const fileNameRef = useRef();

  function handleChangeName(e) {
    e.preventDefault();

    // exit out of editing mode
    setIsEditing(false);

    // get changed filename value
    const fileNameChanged = fileNameRef.current.value;

    // if file name wasnt changed
    if (fileNameChanged === file.name) return;

    // commit changes to db
    db.changeFileName(file.id, fileNameChanged);
    
  }
  if (isEditing) {
    return (
      <>
        {/* accesebility */}
        <Form onSubmit={handleChangeName}>
          <input type="text" defaultValue={file.name} ref={fileNameRef} />
          <input
            type="submit"
            style={{
              position: "absolute",
              left: "-100vw",
            }}
          />
        </Form>
      </>
    );
  } else
    return (
      <>
        <a
          onContextMenu={toggleContextmenu}
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          //   rel="noreferrer"
          className="btn btn-outline-dark text-truncate w-100"
        >
          <FontAwesomeIcon icon={faFile} className="me-2" />
          {file.name}
        </a>
        <ContextMenu
          file={true}
          show={showContextMenu}
          url={file.url}
          path={file.path}
          id={file.id}
          setIsEditing={setIsEditing}
        />
      </>
    );
}
