import { useEffect, useState } from "react";

export default function useContextMenu() {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleContextmenu = (e, state) => {
    // stop from showing the context menu
    e.preventDefault();

    // if state provided, set the current state
    if (state) return setShowContextMenu(state);

    // toggle custom context menu
    setShowContextMenu((prevState) => !prevState);
  };

  useEffect(() => {
    if (showContextMenu !== true) return;

    const contextMenuToggler = (e) => {
      toggleContextmenu(e);
    };

    document.body.addEventListener("mousedown", contextMenuToggler);

    return () => {
      document.body.removeEventListener("mousedown", contextMenuToggler);
    };
  }, [showContextMenu]);

  return { showContextMenu, toggleContextmenu, isEditing, setIsEditing };
}
