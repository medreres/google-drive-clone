import React, { useEffect, useState } from "react";

export default function useContextMenu() {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleContextmenu = (e) => {
    // stop from showing the context menu
    e.preventDefault();

    // toggle custom context menu
    setShowContextMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (showContextMenu !== true) return;

    const contextMenuToggler = (e) => {
      setTimeout(() => {
        toggleContextmenu(e);
      }, 100);
    };

    document.body.addEventListener("mousedown", contextMenuToggler);

    return () => {
      document.body.removeEventListener("mousedown", contextMenuToggler);
    };
  }, [showContextMenu]);

  return [showContextMenu, toggleContextmenu];
}
