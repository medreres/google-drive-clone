import React from "react";
import NavbarComponent from "./Navbar";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";
import { useParams, useLocation } from "react-router-dom";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import AddFileButton from "./AddFileButton";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {}} = useLocation();
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadCrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
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
      </Container>
    </>
  );
}
