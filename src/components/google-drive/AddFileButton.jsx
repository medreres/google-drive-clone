import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFileButton({ currentFolder }) {
  const { currentUser } = useAuth();

  function handleUpload(e) {
    e.preventDefault();

    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const parentPath =
      currentFolder.path.length > 0
        ? currentFolder.path.map((obj) => obj.name).join("/")
        : "";

    console.log(parentPath);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;

    const refPath = `/files/${currentUser.uid}/${filePath}`;

    const storageRef = ref(storage, refPath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          db.addFile({
            url,
            name: file.name,
            folderId: currentFolder.id,
            userId: currentUser.uid,
          });
        });
      }
    );
  }
  return (
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
  );
}
