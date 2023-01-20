import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import useFolder from "../hooks/useFolder";
import AddFileButton from "./AddFileButton";
import AddFolderButton from "./AddFolderButton";
import FolderBreadCrumbs from "./FolderBreadCrumbs";
import NotFound from "./NotFound";
import Folder from './Folder'
import FolderPlaceholder from './FolderPlaceholder'
import FilePlaceholder from './FilePlaceholder'
import File from './File'
import NavbarComponent from './Navbar'


export default function Dashboard({ notFound }) {

  const { folderId } = useParams();
  // const { state = {} } = useLocation();
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
