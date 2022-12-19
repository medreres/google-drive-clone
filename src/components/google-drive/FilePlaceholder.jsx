import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Placeholder } from "react-bootstrap";

export default function FilePlaceholder() {
  return (
    <div
      style={{
        maxWidth: "250px",
        margin: "5px",
      }}
    >
      <span
        // onContextMenu={toggleContextmenu}
        // href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        //   rel="noreferrer"
        className="btn btn-outline-dark w-100"
      >
        <Placeholder animation="glow">
          <FontAwesomeIcon icon={faFile} className="me-2" />
          <Placeholder
            style={{
              width: "100px",
            }}
          />
        </Placeholder>
      </span>
    </div>
  );
}
