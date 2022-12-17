import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useContextMenu from "../../hooks/useContextMenu";
import ContextMenu from "./ContextMenu";

export default function File({ file }) {
  const [showContextMenu, toggleContextmenu] = useContextMenu();
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
      <ContextMenu file={true} show={showContextMenu} url={file.url} path={file.path} id={file.id} />
    </>
  );
}
