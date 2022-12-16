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

export default function Dashboard({ notFound }) {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(folderId);

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
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
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
          </div>
        )}

        {childFiles.length > 0 && childFolders.length > 0 && <hr />}

        {/* Rendering files */}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
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
          </div>
        )}
      </Container>
    </>
  );
}
