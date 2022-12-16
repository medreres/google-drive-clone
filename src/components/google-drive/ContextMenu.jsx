import React from "react";
import styles from "./ContextMenu.module.css";

export default function ContextMenu({ show, x, y, ...props }) {
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
            <i className={`uil uil-eye`}></i>
            <span>Preview</span>
          </li>
          <li className={`${styles.item}`}>
            <i className={`uil uil-share`}></i>
            <span>Share</span>
          </li>
          <li className={`${styles.item}`}>
            <i className={`uil uil-link-alt`}></i>
            <span>Get Link</span>
          </li>
          <li className={`${styles.item}`}>
            <i className={`uil uil-edit`}></i>
            <span>Rename</span>
          </li>
          <li className={`${styles.item}`}>
            <i className={`uil uil-trash-alt`}></i>
            <span>Delete</span>
          </li>
        </ul>
        <div className={`${styles.setting}`}>
          <li className={`${styles.item}`}>
            <i className={`uil uil-setting`}></i>
            <span>Settings</span>
          </li>
        </div>
      </div>
    </div>
  );
}
