import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Placeholder } from "react-bootstrap";

export default function FolderPlaceholder() {
  return (
    <div
      style={{
        maxWidth: "250px",
        margin: "5px",
      }}
    >
      <Button
        // onContextMenu={toggleContextmenu}
        // to={{
        //   pathname: folderPath,
        //   state: { folder },
        // }}
        variant="outline-dark"
        className="text-truncate w-100"
        // as={Link}
      >
        <FontAwesomeIcon icon={faFolder} className="me-2" />
        <Placeholder animation="glow">
          <Placeholder
            style={{
              width: "100px",
            }}
          />
        </Placeholder>
      </Button>
    </div>
  );
}
