import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from "react-bootstrap";
import ContextMenu from "./ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";
import { db } from "../../utils/firebase";

export default function Folder({ folder }) {
  const { showContextMenu, toggleContextmenu, isEditing, setIsEditing } =
    useContextMenu();
  const folderNameRef = useRef();

  const folderPath = `/folders/${folder.id}`;

  function handleChangeName(e) {
    e.preventDefault();

    // change state to not editing
    setIsEditing(false);

    // get changed filename value
    const folderNameChanged = folderNameRef.current.value;

    // if file name wasnt changed
    if (folderNameChanged === folder.name) return;

    

    // commit changes to db
    db.changeFolderName(folder.id, folder.folderIdFB, folder.name , folderNameChanged);
  }

  if (isEditing)
    return (
      <>
        {/* accesebility */}
        <Form onSubmit={handleChangeName}>
          <Form.Group>
            <Form.Control
              autoFocus
              className="border border-dark"
              type="text"
              placeholder="Folder name"
              defaultValue={folder.name}
              ref={folderNameRef}
            />
          </Form.Group>
          <Button type="submit" hidden>
            Submit
          </Button>
        </Form>
      </>
    );
  else
    return (
      <>
        <Button
          onContextMenu={toggleContextmenu}
          to={{
            pathname: folderPath,
            state: { folder },
          }}
          variant="outline-dark"
          className="text-truncate w-100"
          as={Link}
        >
          <FontAwesomeIcon icon={faFolder} className="me-2" />
          {folder.name}
        </Button>
        <ContextMenu
          url={folderPath}
          show={showContextMenu}
          path={folderPath}
          setIsEditing={setIsEditing}
        />
      </>
    );
}
