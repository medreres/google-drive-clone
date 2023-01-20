import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import useContextMenu from "../hooks/useContextMenu";
import { db } from "../../../shared/utils/firebase";
import getIcon from "../utils/getIcon";
import ContextMenu from "./ContextMenu/ContextMenu";

export default function File({ file }) {
  const { showContextMenu, toggleContextmenu, isEditing, setIsEditing } = useContextMenu();
  const fileNameRef = useRef();
  const extension = file.name.slice(file.name.lastIndexOf(".") + 1);
  const icon = getIcon(extension);

  function handleChangeName(e) {
    e.preventDefault();

    // exit out of editing mode
    setIsEditing(false);

    // get changed filename value
    const fileNameChanged = fileNameRef.current.value;

    // if file name wasnt changed
    if (fileNameChanged === file.name) return;

    const fileExtension = file.name.slice(file.name.lastIndexOf("."));

    // commit changes to db
    db.changeFileName(file.id, fileNameChanged + fileExtension);
  }
  if (isEditing) {
    return (
      <>
        {/* accesebility */}
        <Form onSubmit={handleChangeName}>
          <Form.Group>
            <Form.Control
              autoFocus
              className="border border-dark"
              type="text"
              placeholder="File name"
              defaultValue={file.name.slice(0, file.name.indexOf("."))}
              ref={fileNameRef}
            />
          </Form.Group>
          <Button
            type="submit"
            hidden>
            Submit
          </Button>
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
          className="btn btn-outline-dark text-truncate w-100">
          <FontAwesomeIcon
            icon={icon}
            className="me-2"
          />
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
