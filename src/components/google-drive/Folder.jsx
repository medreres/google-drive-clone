import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import ContextMenu from "./ContextMenu";
import useContextMenu from "../../hooks/useContextMenu";

export default function Folder({ folder }) {
  const { showContextMenu, toggleContextmenu, isEditing, setIsEditing } =
    useContextMenu();

  const folderPath = `/folders/${folder.id}`;

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
        {!isEditing && (
          <>
            <FontAwesomeIcon icon={faFolder} className='me-2' />
            {folder.name}
          </>
        )}
        {isEditing && (
          <>
            <input type="text" defaultValue={folder.name} />
          </>
        )}
      </Button>
      <ContextMenu url={folderPath} show={showContextMenu} path={folderPath} />
    </>
  );
}
