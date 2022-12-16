import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import ContextMenu from "./ContextMenu";

export default function Folder({ folder }) {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleContextmenu = (e) => {
    // stop from showing the context menu
    if (e) e.preventDefault();

    // toggle custom context menu
    setShowContextMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (showContextMenu !== true) return;

    document.body.addEventListener("click", toggleContextmenu);

    return () => {
      document.body.removeEventListener("click", toggleContextmenu);
    };
  }, [showContextMenu]);

  return (
    <>
      <Button
        onContextMenu={toggleContextmenu}
        to={{
          pathname: `/folders/${folder.id}`,
          state: { folder },
        }}
        variant="outline-dark"
        className="text-truncate w-100"
        as={Link}
      >
        <FontAwesomeIcon icon={faFolder} /> {folder.name}
      </Button>
      <ContextMenu show={showContextMenu} />
    </>
  );
}
