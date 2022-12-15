import React from "react";
import NavbarComponent from "./Navbar";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../hooks/useFolder";
import Folder from "./Folder";

export default function Dashboard() {
  const { folder, childFolders } = useFolder('0adX3hHsOf8CzNFZc4gO');


  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((folder, index) => (
              <div
                key={folder.id}
                style={{
                  maxWidth: "250px",
                  margin: '5px'
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
