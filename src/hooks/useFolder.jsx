import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useReducer } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDERS: "setChildFolders",
};

const ROOT_FOLDER = {
  name: "root",
  id: null,
  path: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    default:
      return state;
  }
}

export default function useFolder(folderId = null, folder = null) {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: {
          folder: ROOT_FOLDER,
        },
      });
    }

    const docRef = doc(db.folders, folderId);
    getDoc(docRef)
      .then((d) => {
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: db.formatDoc(d),
          },
        });
      })
      .catch((err) => {
        return dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: {
            folder: ROOT_FOLDER,
          },
        });
      });
  }, [folderId]);

  useEffect(() => {
    // create a query
    const q = query(
      db.folders,
      where("parentId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );

    return onSnapshot(q, (snapshot) => {
      const childFolders = [];
      snapshot.forEach((doc) => childFolders.push(db.formatDoc(doc)));

      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: {
          childFolders,
        },
      });
    });
  }, [folderId, currentUser]);

  return state;
}
