import { faFile, faFileAudio, faFileImage, faFilePdf, faFileZipper } from "@fortawesome/free-solid-svg-icons";

export default function getIcon(extension) {
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
