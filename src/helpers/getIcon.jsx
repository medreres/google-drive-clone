import {
  faFile,
  faFileArchive,
  faFileAudio,
  faFileImage,
  faFilePdf,
  faFileZipper,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function getIcon(extension) {
  console.log(extension);
  switch (extension) {
    case "pdf":
      return faFilePdf;
    case "jpg":
      return faFileImage;
    case "aif":
      return faFileAudio;
    case "mp3":
      return faFileAudio;
    case "rar":
    case "zip":
    case "pkg":
    case "7z":
      return faFileZipper;

    default:
      return faFile;
  }
}
