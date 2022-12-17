import React from "react";
import { Link } from "react-router-dom";
import styles from "./ContextMenu.module.css";

export default function ContextMenu({ show, x, y, path, file, ...props }) {
  function copyToClipboard(path) {
    navigator.clipboard.writeText(path);
  }
  return (
    <div
      className={`${styles.wrapper} ${show ? styles.visible : styles.hidden}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      {...props}
    >
      <div className={`${styles.content}`}>
        <ul className={`${styles.menu}`}>
          <li className={`${styles.item}`}>
            {file && (
              <a className="w-100" target="_blank" href={path} rel="noreferrer">
                <i className={`uil uil-eye`}></i>
                <span>Preview</span>
              </a>
            )}
            {!file && (
              <Link
                className="w-100"
                target={"_blank"}
                to={path}
                onClick={(e) => {
                  console.log("clicked");
                }}
              >
                <i className={`uil uil-eye`}></i>
                <span>Preview</span>
              </Link>
            )}
          </li>
          <li
            className={`${styles.item}`}
            onClick={() => copyToClipboard(path)}
          >
            <i className={`uil uil-link-alt`}></i>
            <span>Get Link</span>
          </li>
          <li className={`${styles.item}`}>
            <i className={`uil uil-edit`}></i>
            <span>Rename</span>
          </li>
          <li className={`${styles.item} text-danger`}>
            <i className={`uil uil-trash-alt`}></i>
            <span>Delete</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
