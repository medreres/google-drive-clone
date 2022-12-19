import React from "react";
import NavbarComponent from "./Navbar";
import { Button, Container, Stack } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";
import { useParams, useLocation, Link } from "react-router-dom";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";
import FilePlaceholder from "./FilePlaceholder";
import FolderPlaceholder from "./FolderPlaceholder";
import NotFound from "./NotFound";

export default function Dashboard({ notFound }) {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles, isLoadingFolders, isLoadingFiles } =
    useFolder(folderId);

  // isLoadingFolders
  const folders = isLoadingFolders ? (
    [...Array(3).keys()].map((i) => <FolderPlaceholder key={i} />)
  ) : (
    <>
      {childFolders.length > 0 && (
        <>
          {childFolders.map((folder, index) => (
            <div
              key={folder.id}
              style={{
                maxWidth: "250px",
                margin: "5px",
              }}
            >
              <Folder folder={folder} />
            </div>
          ))}
        </>
      )}
    </>
  );
  // isLoadingFiles
  const files = isLoadingFiles ? (
    [...Array(2).keys()].map((i) => <FilePlaceholder key={i} />)
  ) : (
    <>
      {childFiles.length > 0 && (
        <>
          {childFiles.map((file, index) => (
            <div
              key={file.id}
              style={{
                maxWidth: "250px",
                margin: "5px",
              }}
            >
              <File file={file} />
            </div>
          ))}
        </>
      )}
    </>
  );

  if (notFound) {
    return (
      <NotFound />
    );
  }

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {/* Rendering folders */}
        <div className="d-flex flex-wrap">{folders}</div>

        {childFiles.length > 0 && childFolders.length > 0 && <hr />}
        {isLoadingFiles && isLoadingFolders && <hr />}

        {/* Rendering files */}
        <div className="d-flex flex-wrap">{files}</div>
      </Container>
    </>
  );
}
