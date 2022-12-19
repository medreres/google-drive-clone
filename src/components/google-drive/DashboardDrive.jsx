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

export default function Dashboard({ notFound }) {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles, isLoadingFolders, isLoadingFiles } =
    useFolder(folderId);

  // isLoadingFolders
  const folders = isLoadingFolders ? (
    [...Array(5).keys()].map((i) => <FolderPlaceholder key={i} />)
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
    [...Array(5).keys()].map((i) => <FilePlaceholder key={i} />)
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
      <>
        <NavbarComponent />
        <Stack
          style={{
            maxWidth: "50vw",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20%",
          }}
        >
          <div className="text-center">
            <h2>Not Found</h2>
          </div>
          <Link to="/">
            <span className="btn btn-primary w-100 mt-2">Go Home</span>
          </Link>
        </Stack>
      </>
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
