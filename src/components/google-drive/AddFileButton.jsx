import ReactDOM from "react-dom";
import { uuidv4 } from "@firebase/util";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { getDocs, query, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../../utils/firebase";

export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  async function handleUpload(e) {
    e.preventDefault();

    const id = uuidv4();

    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    setUploadingFiles((prevState) => [
      ...prevState,
      { id, name: file.name, progress: 0, error: false },
    ]);

    const parentPath =
      currentFolder.path.length > 0
        ? currentFolder.path.map((obj) => obj.name).join("/")
        : "";

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;

    const refPath = `/files/${currentUser.uid}/${filePath}`;

    const storageRef = ref(storage, refPath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevState) =>
          prevState.map((uploadingFile) => {
            if (id === uploadingFile.id) {
              return {
                ...uploadingFile,
                progress,
              };
            } else return uploadingFile;
          })
        );
      },

      () => {
        setUploadingFiles((prevState) =>
          prevState.map((uploadingFile) => {
            if (id === uploadingFile.id) {
              return {
                ...uploadingFile,
                error: true,
              };
            } else return uploadingFile;
          })
        );
      },

      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter(
            (uploadFile) => uploadFile.id !== id
          );
        });

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const q = query(
            db.files,
            where("name", "==", file.name),
            where("userId", "==", currentUser.uid),
            where("folderId", "==", currentFolder.id)
          );

          getDocs(q)
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];

              if (existingFile) {
                updateDoc(existingFile.ref, {
                  url: url,
                });
              } else {
                db.addFile({
                  id: uuidv4(),
                  url,
                  name: file.name,
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                  path: refPath,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  }


  return (
    <>
      <label className="btn btn-outline-success  m-0 me-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{
            opacity: 0,
            position: "absolute",
            left: "-9999px",
          }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevState) =>
                    prevState.filter(
                      (uploadingFile) => uploadingFile.id !== file.id
                    )
                  );
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    variant={file.error ? "danger" : "primary"}
                    animated={!file.error}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
